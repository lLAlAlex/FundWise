import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { ProjectInputSchema, Reward } from '@/declarations/project_backend/project_backend.did';

import styles from './ProjectCreate.module.css';
import { Button } from '@nextui-org/button';
import { project_backend } from '@/declarations/project_backend';
import { useUserStore } from '@/store/user/userStore';
type Props = {};

// type ProjectData = {
//   name: string;
//   description: string;
//   category: string;
//   image: File | string;
//   deadline: string | undefined;
//   goal: number;
//   rewards: Array<Reward>;
//   user_id: string;
// };

interface FormAction {
  type: string;
  field?: string;
  payload?: string | File | Reward | Array<Reward> | BigInt | undefined;
}

const defaultData: ProjectInputSchema = {
  name: '',
  description: '',
  category: '',
  image: '',
  deadline: "",
  goal: BigInt(0),
  rewards: [],
  user_id: '',
};

const reduce = (state: ProjectInputSchema, action: FormAction): ProjectInputSchema => {
  const { type, field, payload } = action;

  switch (type) {
    case 'input':
      if (field) {
        return {
          ...state,
          [field]: payload,
        };
      } else return { ...state };
    case 'reset':
      return { ...defaultData };
    default:
      return { ...state };
  }
};

const ProjectCreate = (props: Props) => {
  const userStore = useUserStore();
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [state, dispatch] = useReducer(reduce, defaultData);
  const [images, setImages] = useState<Array<{ id: string; file: File }>>([]);
  const [count, setCount] = useState(1);
  const [rewardsInput, setRewardsInput] = useState<
    Array<{
      id: number;
      data: {
        tier: string;
        price: number;
        description: string;
        quantity: number;
      };
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
    const value = t.type === "number" ? BigInt(t.value) : t.value;
    dispatch({
      type: 'input',
      field: t.name,
      payload: value,
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
      const json = await response.json()
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
    setLoading(true)
    if (!userStore.data || userStore.data.length <= 0) {
      console.log("user not found...")
      return;
    } 

    // console.log(images);
    if (images.length <= 0) {
      console.log('Image not found...');
    }

    const urls = await uploadImage(images);
    /**
     * UPDATE DATA WITH IMAGE URL
     */
    const rewards: Array<Reward> = [];
    urls.forEach((u) => {
      if (u.id === 'image') {
        dispatch({
          type: 'input',
          field: 'image',
          payload: u.url,
        });
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
    dispatch({
      type: 'input',
      field: 'rewards',
      payload: rewards,
    });
    dispatch({
      type: 'input',
      field: 'user_id',
      payload: userStore.data[0].internet_identity.toString(),
    });
    /**
     * TOLONG VALIDASI DULU
     */
    try {
      const res = await project_backend.createProject(state);
      if ("ok" in res) {
        // DO SOMETHING
        setStatus("Succesful!")
      }
    } catch (error) {
      setStatus("Error!")
      console.log(error)  
    }
    setLoading(false);

  };

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  return (
    <div className="flex flex-col w-full items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="text-2xl p-2">Create Project</div>
      <form className="w-full bg-white rounded-lg shadow-md border border-gray-300 p-4">
        <div className="w-full p-1">
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
        <div className="w-full p-1">
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
        <div className="w-full p-1">
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
        <div className="w-full p-1">
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
        <div className="w-full p-1">
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
        <div className="w-full p-1">
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
            value={state.goal + ""}
          />
        </div>
        <div className="w-full p-1">
          <label htmlFor="text" className={styles.label}>
            Rewards
          </label>
          {rewardsInput.map((r) => (
            <div className="flex gap-2 pb-1" key={r.id}>
              <input
                type="text"
                name="tier"
                id={'tier' + r.id}
                className={styles.input}
                placeholder="Reward Tier"
                onChange={(e) => inputReward(r.id, e)}
                value={r.data.tier}
              />
              <input
                type="number"
                name="price"
                id={'price' + r.id}
                className={styles.input}
                placeholder="Reward Price"
                onChange={(e) => inputReward(r.id, e)}
                value={r.data.price}
              />
              <input
                type="text"
                name="description"
                id={'description' + r.id}
                className={styles.input}
                placeholder="Rewared Description"
                onChange={(e) => inputReward(r.id, e)}
                value={r.data.description}
              />
              <input
                type="number"
                name="quantity"
                id={'quantity' + r.id}
                className={styles.input}
                placeholder="Reward Quantity"
                onChange={(e) => inputReward(r.id, e)}
                value={r.data.quantity}
              />
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG"
                name="reward_image"
                id={'reward_image' + r.id}
                className={styles.input}
                onChange={inputImage}
                placeholder="Reward Image"
              />
              <Button
                className="text-md"
                color="primary"
                onClick={() => addRewardField()}
              >
                +
              </Button>
              <Button
                className="text-md"
                color={`danger`}
                type="submit"
                isDisabled={rewardsInput.length <= 1}
                onClick={() => removeRewardField(r.id)}
                // disabled={rewardsInput.length <= 1}
              >
                -
              </Button>
            </div>
          ))}
        </div>
        {/* 
          TODO: Kasih dialog kalo udh kelar, loading ny kasih animasi jg
        */}
        {loading ? (<div>Is Loading</div>) : (<div>{status}</div>)}
        <Button
          variant="solid"
          color="primary"
          className="text-lg"
          onClick={handleSubmit}
          isDisabled={loading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ProjectCreate;
