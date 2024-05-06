import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

type Props = {
  placeholder?: string;
  value: string;
  handleChange?: (value: string) => void;
  onSubmit?: () => void;
};

const Search = (props: Props) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(props.onSubmit) {
            props.onSubmit()
        }
    }
  return (
    <form className="relative" onSubmit={handleSubmit}>
      {/* <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
        <FaMagnifyingGlass className="w-4 h-4 text-gray-400 cursor-default" />
      </div> */}
      <Input
        // label="Search"
        color='secondary'
        variant='underlined'
        placeholder={props.placeholder ?? 'Search anything...'}
        value={props.value}
        onValueChange={props.handleChange}
        startContent={<FaMagnifyingGlass className="w-4 h-4 text-gray-400 cursor-default" />}
        endContent={<Button size='md' type='submit' variant='solid' color='primary'>Search</Button>}
      />

    </form>
  );
};

export default Search;
