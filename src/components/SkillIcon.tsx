import React from 'react';

interface SkillIconProps {
  skill: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ skill }) => {
  const iconMap: { [key: string]: string } = {
    'android studio': 'androidstudio.png',
    'express.js': 'expressjs.png',
    java: 'java.png',
    javascript: 'javascript.png',
    kotlin: 'kotlin.png',
    'nest.js': 'nestjs.png',
    'next.js': 'next.js.png',
    'node.js': 'node.js.png',
    react: 'react.png',
    'react native': 'reactnative.png',
    'spring boot': 'springboot.png',
    'spring data jpa': 'SpringDataJpa.png',
    'spring security': 'SpringSecurity.png',
    swift: 'swift.png',
    typescript: 'typescript.png',
    unity: 'unity.png',
    unreal: 'unrealengine.png',
    vue: 'vue.js.png',
  };

  const normalizedSkill = skill.toLowerCase();
  const iconName = iconMap[normalizedSkill];

  if (!iconName) return null;

  return (
    <span className='flex items-center space-x-1'>
      <img src={`/images/skills/${iconName}`} alt={skill} className='w-4 h-4' />
      <span>{skill}</span>
    </span>
  );
};

export default SkillIcon;
