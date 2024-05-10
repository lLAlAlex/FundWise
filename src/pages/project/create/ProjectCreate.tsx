import React, { ChangeEvent, useReducer, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { Reward } from '@/declarations/project_backend/project_backend.did';

import styles from './ProjectCreate.module.css';
import { Button } from '@nextui-org/button';
type Props = {};

type ProjectData = {
  name: string;
  description: string;
  category: string;
  image: File | string;
  deadline: string | undefined;
  goal: number;
  rewards: Array<Reward>;
  user_id: string;
};

interface FormAction {
  type: string;
  field?: string;
  payload?: string | File | Reward | Array<Reward> | number | undefined;
}

const defaultData: ProjectData = {
  name: '',
  description: '',
  category: '',
  image: '',
  deadline: undefined,
  goal: 0,
  rewards: [],
  user_id: '',
};

const reduce = (state: ProjectData, action: FormAction): ProjectData => {
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
  const [state, dispatch] = useReducer(reduce, defaultData);
  const [count, setCount] = useState(1);
  const [rewardsInput, setRewardsInput] = useState<
    Array<{ id: number; data: Reward }>
  >([
    {
      id: 0,
      data: {
        tier: '',
        price: BigInt(0),
      },
    },
  ]);
  //   const [publicId, setPublicId] = useState('projces/images');
  //   const [cloudName] = useState('dogiichep');
  //   const [uwConfig] = useState({
  //     cloudName,
  //   });

  //   const cld = new Cloudinary({
  //     cloud: {
  //       cloudName,
  //     },
  //   });

  //   const myImage = cld.image(publicId);

  const inputData = (e: ChangeEvent) => {
    const t = e.target as HTMLInputElement;
    // const isValidFile = t.type === "file" && t.files && t.files.length > 1;
    const value = t.type === "file" && t.files && t.files.length > 1 ? t.files[0] : t.value;
    if (!(t.type === "file" && t.files && t.files.length > 1) && t.name === "image") {
      return;
    }
    // const value = t.type === "checkbox" ? !state.remember : t.value;
    // console.log(t.value);
    dispatch({
      type: 'input',
      field: t.name,
      payload: value,
    });
  };

  const addRewardField = () => {
    const newReward = { id: count + 1, data: { price: BigInt(0), tier: '' } };
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
    const newData = rewardsInput?.map((r) => {
      if (r.id == id) {
        if (target.name === "price") {
          r.data.price = BigInt(target.value)
        } else {
          r.data.tier = target.value
        }
        return r;
      }
      return r;
    });
    setRewardsInput(newData);
  }

  const uploadImage = async () : Promise<any> => {
    // UPLOAD IMAGE
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rewards : Reward[] = [];
    rewardsInput.forEach(element => {
      rewards.push({
        ...element.data
      })
    });

    const img = await uploadImage();
    // UPLAOD KE BE

  }

  return (
    <div className="flex flex-col w-full items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="text-2xl p-2">Create Project</div>
      <form className="w-full bg-white rounded-lg shadow-md border border-gray-300 p-4" onSubmit={handleSubmit}>
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
            name="image"
            id="image"
            className={styles.input}
            placeholder="Project Image"
            onChange={inputData}
            value={state.image.toString()}
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
            value={state.goal <= 0 ? undefined : state.goal}
          />
        </div>
        <div className="w-full p-1">
          <label htmlFor="text" className={styles.label}>
            Rewards
          </label>
          {rewardsInput.map((r, idx) => (
            <div className="flex gap-2 pb-1" key={r.id}>
              <input
                type="text"
                name="tier"
                id={"tier"+r.id} 
                className={styles.input}
                placeholder="Reward Tier"
                onChange={(e) => inputReward(r.id, e)}
                value={state.goal <= 0 ? undefined : state.goal}
              />
              <input
                type="number"
                name="price"
                id={"price"+r.id}
                className={styles.input}
                placeholder="Reward Price"
                onChange={(e) => inputReward(r.id, e)}
                value={state.goal <= 0 ? undefined : state.goal}
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
                isDisabled={rewardsInput.length <= 1}
                onClick={() => removeRewardField(r.id)}
                // disabled={rewardsInput.length <= 1}
              >
                -
              </Button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default ProjectCreate;
