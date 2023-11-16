'use client';

import { NextPage } from 'next';
import { useDispatch } from 'react-redux';

import { Button, ToastType } from '@odnlabs/ui';

import { addToast } from '@store';

const CreateGuild: NextPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-full min-h-screen w-full bg-gradient-to-tr from-[#2E1442] to-[#141745] p-10">
        <div className="bg-background/50 border-border rounded-md border p-10">
          <h1 className="mb-5 text-3xl font-bold">Create a new Guild</h1>
          <Button
            label="Submit"
            onClick={() => dispatch(
                addToast({
                  title: 'Guild Created Successfully',
                  description:
                    'You can now start adding members to your guild.',
                  type: ToastType.Success,
                  time: 5000,
                })
              )}
            variant="primary"
          />
        </div>
      </div>
  );
};

export default CreateGuild;
