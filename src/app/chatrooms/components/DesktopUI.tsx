'use client';
import SearchBar from '@/components/SearchBar';
import SearchSkillBar from '@/components/SearchSkillBar';
import SkillIcon from '@/components/SkillIcon';
import { FullConversationType } from '@/types';
import { TechStack } from '@/types/types';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import ChatroomCard from './ChatroomCard';
import { pusherClient } from '@/libs/pusher';
import { find } from 'lodash';
import EnterModal from './EnterModal';

interface DesktopUIInterface {
  publicConversations: FullConversationType[];
}

const DesktopUI = ({ publicConversations }: DesktopUIInterface) => {
  const [selectedConversation, setSelectedConversation] = useState<FullConversationType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState(publicConversations);
  const [filteredItems, setFilteredItems] = useState<FullConversationType[]>(publicConversations);
  const [keyword, setKeyword] = useState<string>('');
  const [skills, setSkills] = useState<TechStack[]>([]);

  const onClickToSetSkills = (skill: TechStack) => {
    setSkills(prevSkills => {
      if (!prevSkills.includes(skill)) {
        return [...prevSkills, skill];
      }
      return prevSkills;
    });
  };

  const onClickToRemoveSkills = (skill: TechStack) => {
    setSkills(prevSkills => {
      const updateSkills = prevSkills.filter(prevSkill => prevSkill !== skill);
      return updateSkills;
    });
  };

  useEffect(() => {
    pusherClient.subscribe('all');

    const newHandler = (conversation: FullConversationType) => {
      setItems(current => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    pusherClient.bind('open_conversation:new', newHandler);

    return () => {
      pusherClient.unsubscribe('all');
      pusherClient.unbind('open_conversation:new', newHandler);
    };
  }, []);

  const handleOpenModal = (conversation: FullConversationType) => {
    setSelectedConversation(conversation); // 선택된 채팅방 저장
    setIsModalOpen(true); // 모달 열기
  };

  useEffect(() => {
    // 필터링 로직
    const filterItems = () => {
      let newFilteredItems = items;

      // 키워드로 필터링
      if (keyword) {
        newFilteredItems = newFilteredItems.filter(item =>
          item.name!.toLowerCase().includes(keyword.toLowerCase()),
        );
      }

      // 기술로 필터링
      if (skills.length > 0) {
        newFilteredItems = newFilteredItems.filter(item =>
          skills.some(skill => item.tag.includes(skill)),
        );
      }

      setFilteredItems(newFilteredItems);
    };

    filterItems();
  }, [items, keyword, skills]);

  return (
    <>
      <EnterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        conversation={selectedConversation!}
        isPublic
      />
      <div
        className={`
      hidden
      h-full
      w-full
      lg:block
      grid-background
      py-8
      px-8
      pl-80
      `}
      >
        <div className='flex flex-1 flex-col w-full justify-center items-center'>
          <div
            className='border-0 ring-1 ring-inset ring-gray-300 mt-3 text-3xl font-bold tracking-tight text-center shadow-lg py-4 px-4 w-max bg-white sm:rounded-lg text-gray-900
          dd'
          >
            <div>관심사 채팅방 찾기</div>
          </div>
        </div>
        <div className='w-full flex justify-center items-center'>
          <div className='w-full max-w-md mt-4'>
            <SearchBar fullWidth onChange={setKeyword} value={keyword} />
          </div>
        </div>
        <div className='w-full flex justify-center items-center'>
          <div className='flex w-full max-w-md mt-4 flex-col'>
            <SearchSkillBar fullWidth shadow={true} onClickSkillItem={onClickToSetSkills} />
            <div className='flex flex-wrap space-x-3'>
              {Array.from(skills).map(skill => (
                <div className='flex items-center mt-2' key={skill}>
                  <SkillIcon skill={skill} />
                  <span onClick={() => onClickToRemoveSkills(skill)}>
                    <TiDelete
                      className={clsx(
                        `
                          text-gray-500
                          hover:text-gray-300
                          cursor-pointer
                        `,
                      )}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex gap-3 mt-5 flex-wrap px-5 justify-center overflow-y-auto h-80'>
          {filteredItems.map(item => (
            <div key={item.id} onClick={() => handleOpenModal(item)}>
              <ChatroomCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesktopUI;
