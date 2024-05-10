import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import classNames from 'classnames';

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
        style={{fontSize: '1.4rem'}}
        color='secondary'
        variant='underlined'
        placeholder={props.placeholder ?? 'Search anything...'}
        value={props.value}
        onValueChange={props.handleChange}
        startContent={<FaMagnifyingGlass className={`w-4 h-4 ${props.value ? 'text-purple-600' : 'text-gray-400'} cursor-default`} />}
        endContent={<Button size='sm' type='submit' variant='solid' className={`px-5 text-xs ${props.value ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700' : 'bg-gray-400'} text-white`}>Search</Button>}
      />

    </form>
  );
};

export default Search;
