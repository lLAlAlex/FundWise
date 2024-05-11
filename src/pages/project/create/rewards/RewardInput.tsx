import { Button } from '@nextui-org/button';
import styles from '../ProjectCreate.module.css';
import React, { SyntheticEvent, useState } from 'react';
import { an } from 'vitest/dist/types-198fd1d9';

type RewardData = {
  tier: string;
  price: number;
  description: string;
  quantity: number;
};

type Props = {
  rewardsInput: { id: number; data: RewardData }[];
  inputReward: (id: number, e: SyntheticEvent) => void;
  inputImage: any;
  addRewardField: any;
  removeRewardField: any;
};

const RewardInput = (props: Props) => {
  return (
    <>
      {props.rewardsInput.map((r) => (
        <div className="flex gap-2 p-1 pb-2 justify-center items-end border-b border-b-gray-400" key={r.id}>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-1 items-center w-full">
              <div>
                <label htmlFor="tier" className={styles.label}>
                  Tier
                </label>
                <input
                  type="text"
                  name="tier"
                  id={'tier' + r.id}
                  className={styles.input}
                  placeholder="Reward Tier"
                  onChange={(e) => props.inputReward(r.id, e)}
                  value={r.data.tier}
                />
              </div>
              <div>
                <label htmlFor="price" className={styles.label}>
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id={'price' + r.id}
                  className={styles.input}
                  placeholder="Reward Price"
                  onChange={(e) => props.inputReward(r.id, e)}
                  value={r.data.price}
                />
              </div>
              <div>
                <label htmlFor="quantity" className={styles.label}>
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id={'quantity' + r.id}
                  className={styles.input}
                  placeholder="Reward Quantity"
                  onChange={(e) => props.inputReward(r.id, e)}
                  value={r.data.quantity}
                />
              </div>
            </div>
            <div className="flex flex-row items-center w-full gap-1">
              <div className='w-full'>
                <label htmlFor="quantity" className={styles.label}>
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  id={'description' + r.id}
                  className={styles.input}
                  placeholder="Reward Description"
                  onChange={(e) => props.inputReward(r.id, e)}
                  value={r.data.description}
                />
              </div>
              <div>
                <label htmlFor="reward_image" className={styles.label}>Image</label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg, .PNG, .JPG, .JPEG"
                  name="reward_image"
                  id={'reward_image' + r.id}
                  className={styles.input}
                  onChange={props.inputImage}
                  placeholder="Reward Image"
                />
              </div>
            </div>
          </div>
          <div className='flex gap-1 p-1'> 
            <Button
              className="text-md"
              color="primary"
              variant="light"
              onClick={() => props.addRewardField()}
            >
              +
            </Button>
            <Button
              className="text-md"
              variant="light"
              color={`danger`}
              type="submit"
              isDisabled={props.rewardsInput.length <= 1}
              onClick={() => props.removeRewardField(r.id)}
            >
              -
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default RewardInput;
