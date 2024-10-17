'use client';
import FindPeoplesModal from '@/components/findPeoples/FindPeoplesModal';
import IconButton from '@/components/IconButton';
import OpenChatModal from '@/components/modals/OpenChatModal';
import SearchBar from '@/components/SearchBar';
import SearchSkillBar from '@/components/SearchSkillBar';
import SkillIcon from '@/components/SkillIcon';
import { pusherClient } from '@/libs/pusher';
import { FullConversationType } from '@/types';
import { TechStack } from '@/types/types';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { find } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FaCreativeCommonsBy } from 'react-icons/fa6';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import ChatroomCard from './ChatroomCard';
import EnterModal from './EnterModal';
import MobileChatroomCard from './MobileChatroomCard';
import MobileUsersModal from './MobileUsersModal';
import useUserStore from '@/store/useUserStore';

interface MoblieUIInterface {
  currentUser: User;
  publicConversations: FullConversationType[];
}

const MobileUI = ({ currentUser, publicConversations }: MoblieUIInterface) => {
  const [items, setItems] = useState(publicConversations);
  const [filteredItems, setFilteredItems] = useState<FullConversationType[]>(publicConversations);
  const [selectedConversation, setSelectedConversation] = useState<FullConversationType | null>(
    null,
  );
  const [isModealOpen, setIsModealOpen] = useState(false); //오픈챗모달
  const [isFindModal, setIsFindModal] = useState(false); //유저찾기모달
  const [keyword, setKeyword] = useState<string>('');
  const [skills, setSkills] = useState<TechStack[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFindUserModal, setIsFindUserModal] = useState(false); //유저찾은모달
  const { users } = useUserStore();

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
    setIsFindUserModal(false);
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

  const handleOpenModal = (conversation: FullConversationType) => {
    setSelectedConversation(conversation); // 선택된 채팅방 저장
    setIsModalOpen(true); // 모달 열기
  };

  useEffect(() => {
    if (users.length > 0) {
      setIsFindUserModal(true);
    }
  }, [users]);

  return (
    <>
      <MobileUsersModal isOpen={isFindUserModal} onClose={() => setIsFindUserModal(false)} />
      <EnterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        conversation={selectedConversation!}
        isPublic
      />
      <OpenChatModal
        currentUser={currentUser}
        isOpen={isModealOpen}
        onClose={() => setIsModealOpen(false)}
      />
      <FindPeoplesModal isOpen={isFindModal} onClose={() => setIsFindModal(false)} />
      <div
        className={`
      h-full
      lg:hidden
      bg-white
      `}
      >
        <div className='flex justify-center items-center py-6'>
          <div className='text-2xl font-bold text-neutral-800'>AMUNA</div>
          <div
            className='w-7 h-7 bg-transparent absolute left-3'
            onClick={() => setIsFindModal(true)}
          >
            <IconButton icon={FaCreativeCommonsBy} />
          </div>
          <div
            className='w-7 h-7 bg-transparent absolute right-3'
            onClick={() => setIsModealOpen(true)}
          >
            <IconButton icon={MdOutlineGroupAdd} />
          </div>
        </div>
        <div className='flex w-full  justify-center'>
          <SearchBar onChange={setKeyword} value={keyword} />
        </div>
        <div className='flex  w-full  justify-center mt-2'>
          <SearchSkillBar isMobile shadow={true} onClickSkillItem={onClickToSetSkills} />
        </div>
        <div className='px-32 w-full'>
          <div className='flex  flex-wrap space-x-3 justify-center h-10 w-full'>
            {Array.from(skills).map(skill => (
              <div className='flex items-center mt-2' key={skill}>
                <SkillIcon skill={skill} notLabel />
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
        <div className='flex gap-2 mt-1 flex-wrap px-5 overflow-y-auto justify-center h-72'>
          {filteredItems.map(item => (
            <div key={item.id} onClick={() => handleOpenModal(item)}>
              <MobileChatroomCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileUI;
