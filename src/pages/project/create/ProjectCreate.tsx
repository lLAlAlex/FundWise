import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import {
  ProjectInputSchema,
  Reward,
  Wallet,
} from '@/declarations/project_backend/project_backend.did';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import styles from './ProjectCreate.module.css';
import { project_backend } from '@/declarations/project_backend';
import { useUserStore } from '@/store/user/userStore';
import RewardInput from './rewards/RewardInput';
import { Link } from 'react-router-dom';

type Props = {};

interface FormAction {
  type: string;
  field?: string;
  payload?:
  | string
  | File
  | Reward
  | Array<Reward>
  | BigInt
  | Wallet
  | undefined;
}

type RewardData = {
  tier: string;
  price: number;
  description: string;
  quantity: number;
};

const defaultData: ProjectInputSchema = {
  name: '',
  description: '',
  category: '',
  image: '',
  deadline: '',
  goal: BigInt(0),
  rewards: [],
  user_id: '',
  wallet: { qr: '', address: '' },
};

const reduce = (
  state: ProjectInputSchema,
  action: FormAction,
): ProjectInputSchema => {
  const { type, field, payload } = action;

  switch (type) {
    case 'input':
      if (field) {
        return {
          ...state,
          [field]: payload,
        };
      } else return { ...state };
    case 'wallet_address': 
      if (typeof payload === "string")
        return {
          ...state,
          wallet: {
            ...state.wallet,
            address: payload
          }
        }
    case 'reset':
      return { ...defaultData };
    default:
      return { ...state };
  }
};

const ProjectCreate = (props: Props) => {
  const userStore = useUserStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [state, dispatch] = useReducer(reduce, defaultData);
  const [images, setImages] = useState<Array<{ id: string; file: File }>>([]);
  const [count, setCount] = useState(1);
  const [rewardsInput, setRewardsInput] = useState<
    Array<{
      id: number;
      data: RewardData;
    }>
  >([
    {
      id: 0,
      data: {
        tier: '',
        price: 0,
        description: '',
        quantity: 0,
      },
    },
  ]);

  const inputData = (e: ChangeEvent) => {
    const t = e.target as HTMLInputElement;
    // const isValidFile = t.type === "file" && t.files && t.files.length > 1;
    const value = t.type === 'number' ? BigInt(t.value) : t.value;
    dispatch({
      type: 'input',
      field: t.name,
      payload: value,
    });
  };

  const inputWallet = (e: ChangeEvent) => {
    const t = e.target as HTMLInputElement;
    dispatch({
      type: 'wallet_address',
      payload: t.value,
    });
  };

  const addRewardField = () => {
    const newReward = {
      id: count + 1,
      data: {
        tier: '',
        price: 0,
        description: '',
        image: '',
        quantity: 0,
      },
    };
    if (!rewardsInput) {
      setRewardsInput([newReward]);
    } else {
      setRewardsInput([...rewardsInput, newReward]);
    }
    setCount(count + 1);
  };

  const removeRewardField = (id: number) => {
    if (rewardsInput?.length === 1) {
      return;
    }
    const newArr = rewardsInput?.filter(function (r) {
      return r.id != id;
    });
    setRewardsInput(newArr);
  };

  const inputReward = (id: number, e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    const rewards: Array<Reward> = [];
    const newData = rewardsInput?.map((r) => {
      if (r.id == id) {
        if (target.name === 'price') {
          r.data.price = +target.value;
        } else if (target.name === 'tier') {
          r.data.tier = target.value;
        } else if (target.name === 'description') {
          r.data.description = target.value;
        } else if (target.name === 'quantity') {
          r.data.quantity = +target.value;
        }
      }
      return r;
    });
    dispatch({
      type: 'input',
      field: 'rewards',
      payload: rewards,
    });
    setRewardsInput(newData);
  };

  const inputImage = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const files = target.files;
    const f = files?.item(files.length - 1);
    // console.log(files);
    // console.log(f);
    if (f && f !== null) {
      setImages([...images, { id: target.id, file: f }]);
    }
  };

  const uploadImage = async (
    images: Array<{ id: string; file: File }>,
  ): Promise<{ id: string; url: string }[]> => {
    // UPLOAD MULTIPLE IMAGE
    // SESUAIN
    const url = 'https://api.cloudinary.com/v1_1/dogiichep/image/upload';
    const formData = new FormData();
    const res: { id: string; url: string }[] = [];
    for (let i = 0; i < images.length; i++) {
      let element = images[i];
      formData.append('file', element.file);
      formData.append('upload_preset', 'vhbz9vmj');

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      const json = await response.json();
      if (json.url) {
        res.push({
          id: element.id,
          url: json.url,
        });
      }
    }
    return res;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('Uploading Data, please wait a moment....');
    if (!userStore.data || userStore.data.length <= 0) {
      setStatus('User not found, please log in...');
      setLoading(false);
      return;
    }

    // console.log(images);
    if (images.length <= 0) {
      setStatus('Image not found...');
      setLoading(false);
    }

    const urls = await uploadImage(images);
    /**
     * UPDATE DATA WITH IMAGE URL
     */
    const data: ProjectInputSchema = { ...state }
    const rewards: Array<Reward> = [];
    urls.forEach((u) => {
      if (u.id === 'image') {
        data.image = u.url;
      } else if (u.id === 'qr') {
        data.wallet = {
          qr: u.url,
          address: state.wallet.address
        }
      } else {
        const n = +u.id.substring(u.id.length - 1);
        const ri = rewardsInput.find((v) => v.id === n);
        if (ri) {
          rewards.push({
            tier: ri.data.tier,
            description: ri.data.description,
            image: u.url,
            price: BigInt(ri.data.price),
            quantity: BigInt(ri.data.quantity),
          });
        }
      }
    });

    const deadlineParts = state.deadline.split('-');
    const formattedDeadline = `${deadlineParts[2]}-${deadlineParts[1]}-${deadlineParts[0]}`;

    const toUpload: ProjectInputSchema = { 
      ...data, 
      deadline: formattedDeadline,
      rewards: rewards, 
      user_id: userStore.data[0].internet_identity.toString() 
    };

    try {
      const res = await project_backend.createProject(toUpload);
      console.log(res);
      console.log(toUpload);
      if ('ok' in res) {
        // DO SOMETHING
        setStatus('Succesful!');
      }
    } catch (error) {
      setStatus('Error!');
      console.log(error);
    }
    setLoading(false);
  };

  console.log(state.deadline);

  return (
    <div className="flex flex-col w-full items-center px-6 py-8 mx-auto ">
      <form className={styles.container}>
        <div className="text-2xl p-2 w-full text-center font-bold">
          Create Project
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Project Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={styles.input}
            placeholder="Your project name e.g:Air Umbrella"
            onChange={inputData}
            value={state.name}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className={styles.input}
            placeholder="Your project description"
            onChange={inputData}
            value={state.description}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            className={styles.input}
            placeholder="Project Category"
            onChange={inputData}
            value={state.category}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="category" className={styles.label}>
            Image
          </label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG"
            name="image"
            id="image"
            className={styles.input}
            placeholder="Project Image"
            onChange={inputImage}
          // onChange={inputData}
          // value={state.image.toString()}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="deadline" className={styles.label}>
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            className={styles.input}
            placeholder="Project Deadline"
            onChange={inputData}
            defaultValue={state.deadline}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="goal" className={styles.label}>
            Fund Goal
          </label>
          <input
            type="number"
            name="goal"
            id="goal"
            className={styles.input}
            placeholder="Funding goal for your project"
            onChange={inputData}
            value={state.goal + ''}
          />
        </div>
        <div className="flex flex-row gap-1 items-center">
          <div className={styles.inputContainer}>
            <label htmlFor="qr" className={styles.label}>
              Wallet QR Code
            </label>
            <input
              accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG"
              type="file"
              name="qr"
              id="qr"
              className={styles.input}
              onChange={inputImage}
            // value={state.goal + ''}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="address" className={styles.label}>
              Wallet Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className={styles.input}
              placeholder="Your Wallet Address"
              onChange={inputWallet}
              value={state.wallet.address + ''}
            />
          </div>
        </div>

        <Link to={'https://nns.ic0.app/'} className='underline text-blue-400 hover:text-blue-600 transition-colors ease-linear text-sm'>Create your wallet here.</Link>

        <div className={styles.inputContainer}>
          <label htmlFor="text" className={styles.label}>
            Rewards
          </label>
          {rewardsInput.map(
            (r) =>
              r.data.tier !== '' && (
                <div className="flex flex-row text-sm text-gray-400 gap-2">
                  <div>Tier : {r.data.tier}</div>
                  <div>Price : {r.data.price}</div>
                </div>
              ),
          )}
          <Button onPress={onOpen} className="text-sm" color="primary">
            Add Rewards
          </Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="min-w-[80rem] max-h-[40rem] overflow-auto">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-lg">
                    Add Reward
                  </ModalHeader>
                  <ModalBody>
                    <RewardInput
                      addRewardField={addRewardField}
                      inputImage={inputImage}
                      inputReward={inputReward}
                      removeRewardField={removeRewardField}
                      rewardsInput={rewardsInput}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      className="text-sm"
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="text-gray-600 text-sm py-1">{status}</div>
        <div className="w-full text-center">
          <Button
            className="text-end text-xs bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white"
            onClick={handleSubmit}
            isDisabled={loading}
          >
            Add New Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreate;
