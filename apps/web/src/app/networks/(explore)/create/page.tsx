'use client';

import { NextPage } from 'next';
import { useDispatch } from 'react-redux';

import { Button, ToastType } from '@odnlabs/ui';

import { addToast } from '@store';

const CreateGuild: NextPage = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="w-full p-10 h-full min-h-screen bg-gradient-to-tr from-[#2E1442] to-[#141745]">
        <div className="p-10 border rounded-md bg-background/50 border-border">
          <h1 className="mb-5 text-3xl font-bold">Create a new Guild</h1>
          <Button
            label="Submit"
            variant="primary"
            onClick={() =>
              dispatch(
                addToast({
                  title: 'Guild Created Successfully',
                  description:
                    'You can now start adding members to your guild.',
                  type: ToastType.Success,
                  time: 5000,
                })
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default CreateGuild;
