"use client";

import Button from "@/components/button";
import {
  EllipsisVertical,
  Folder,
  FolderDown,
  FolderPen,
  FolderSymlink,
  Trash2,
} from "lucide-react";
import { Popover } from "radix-ui";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddEditBucket from "./components/add-edit-bucket";
import { IAddEditBucketForm } from "./components/add-edit-bucket-form";
import SideSlider from "@/components/SideSlider";
import { FolderIcon } from "@/components/svg/Folder";

const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FlexTitle = styled.div`
  flex: 1 0 auto;
  font-size: 24px;
  color: var(--text-color-dark-primary);
  font-weight: 600;
`;

const FlexLeftOptions = styled.div`
  width: 100%;
  flex: 1 1 auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const BucketsContainer = styled.div`
  width: 100%;
  margin-top: 2rem;

  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 75px;
  gap: 1.5rem;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-start;

  padding: 0.75rem 0.5rem;

  gap: 0.5rem;

  border: 1px solid var(--border-color-subtle-primary);
  border-radius: var(--border-radius);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-lg-primary);
  }
`;

const CardMiddleContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.25rem;

  & :first-child {
    font-size: 14px;
    color: var(--text-color-dary-primary);
    font-weight: 600;
  }

  & :last-child {
    font-size: 12px;
    font-weight: 500;
  }
`;

const PopoverContent = styled.div`
  width: 160px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0.75rem;
  border-radius: var(--border-radius);

  outline: none;
  background-color: white;

  box-shadow: var(--shadow-lg-primary);
  animation-duration: 5;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity, height;

  & > .danger {
    color: var(--color-danger);

    &:hover {
      color: var(--color-danger);
    }
  }
`;

const PopoverListItem = styled.div`
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  font-size: 12px;
  font-weight: 600;

  & svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: var(--text-color-dark-primary);
    background-color: var(--bg-color-element-hover-primary);
  }

  &:active {
    background-color: var(--bg-color-element-active-primary);
  }
`;

const CardOption = styled.div`
  cursor: pointer;
`;

const SliderFloderIcon = styled(FolderIcon)`
  width: 6rem;
  height: 6rem;
  margin: 2rem auto;
`;

const SliderTitle = styled.div`
  width: 100%;
  font-size: 20px;
  color: var(--text-color-dark-primary);
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 600;

  color: var(--text-color-dark-primary);
`;

const InfoList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .label {
    font-size: 14px;
    color: var(--text-color-light-primary);
    font-weight: 500;
  }

  & .value {
    font-size: 14px;
    color: var(--text-color-dark-primary);
    font-weight: 600;
  }
`;

interface Bucket {
  id: string;
  name: string;
}

const Buckets = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);

  const [edit, setEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [bucketId, setBucketId] = useState<string | null>(null);
  const [sideSliderOpen, setSideSliderOpen] = useState<boolean>(false);
  const [selectedBucket, setSelectedBucket] = useState<Bucket | null>(null);

  const handleCreateBucket = () => {
    setEdit(false);
    setBucketId(null);
    setShowDialog(true);
  };

  const handleRenameBucket = (bucketId: string) => {
    setEdit(true);
    setBucketId(bucketId);
    setShowDialog(true);
  };

  const handleDeleteBucket = (bucketId: string) => {
    setBuckets((prevState) =>
      prevState.filter((bucket) => bucket.id !== bucketId)
    );
  };

  const handleDialogOpenChange = (value: boolean) => {
    setShowDialog(value);
  };

  const handleBucketSave = async (values: IAddEditBucketForm["formState"]) => {
    if (edit) {
      setBuckets((prevState) => {
        const updatedBuckets = prevState.map((bucket) =>
          bucket.id === bucketId ? { ...bucket, name: values.name } : bucket
        );

        return updatedBuckets;
      });
    } else {
      setBuckets((prevState) => [
        ...prevState,
        {
          id: Math.random().toString(),
          name: values.name,
        },
      ]);
    }

    setEdit(false);
    setShowDialog(false);
    setBucketId(null);
  };

  const handleBucketClick = (bucket: Bucket) => {
    setSelectedBucket(bucket);
    setSideSliderOpen(true);
  };

  useEffect(() => {
    return () => {
      setEdit(false);
      setShowDialog(false);
      setBucketId(null);
      setBuckets([]);
    };
  }, []);

  const bucketElementList = buckets.map((bucket) => {
    return (
      <Card key={bucket.id}>
        <FolderIcon onClick={() => handleBucketClick(bucket)} />

        <CardMiddleContent onClick={() => handleBucketClick(bucket)}>
          <div>{bucket.name}</div>
          <div>2 MB</div>
        </CardMiddleContent>

        <CardOption>
          <Popover.Root>
            <Popover.Trigger asChild>
              <EllipsisVertical />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content sideOffset={10} asChild>
                <PopoverContent>
                  <PopoverListItem>
                    <FolderSymlink /> Open
                  </PopoverListItem>

                  <PopoverListItem>
                    <FolderDown /> Download
                  </PopoverListItem>

                  <PopoverListItem
                    onClick={() => handleRenameBucket(bucket.id)}
                  >
                    <FolderPen /> Rename
                  </PopoverListItem>

                  <PopoverListItem
                    className="danger"
                    onClick={() => handleDeleteBucket(bucket.id)}
                  >
                    <Trash2 /> Delete
                  </PopoverListItem>
                </PopoverContent>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </CardOption>
      </Card>
    );
  });

  return (
    <>
      <ContentHeader>
        <FlexTitle>Bucket Manager</FlexTitle>
        <FlexLeftOptions>
          <Button text="Create Bukcet" onClick={() => handleCreateBucket()} />
        </FlexLeftOptions>
      </ContentHeader>

      <BucketsContainer>{bucketElementList}</BucketsContainer>

      {showDialog && (
        <AddEditBucket
          edit={edit}
          open={showDialog}
          closeDialog={() => handleDialogOpenChange(false)}
          bucket={
            buckets.find((bucket) => bucket.id === bucketId) || { name: "" }
          }
          onSave={handleBucketSave}
        />
      )}

      <SideSlider
        open={sideSliderOpen}
        onOpenChange={() => setSideSliderOpen(false)}
      >
        {selectedBucket && (
          <>
            <SliderFloderIcon />
            <SliderTitle>{selectedBucket.name}</SliderTitle>
            <InfoList>
              <Label>Info</Label>

              <InfoListItem>
                <div className="label">Size</div>
                <div className="value">2 MB</div>
              </InfoListItem>

              <InfoListItem>
                <div className="label">Created At</div>
                <div className="value">2023-03-20</div>
              </InfoListItem>

              <InfoListItem>
                <div className="label">Last Modified</div>
                <div className="value">2023-03-20</div>
              </InfoListItem>

              <InfoListItem>
                <div className="label">Created By</div>
                <div className="value">Rahul Saini</div>
              </InfoListItem>

            </InfoList>
          </>
        )}
      </SideSlider>
    </>
  );
};

export default Buckets;
