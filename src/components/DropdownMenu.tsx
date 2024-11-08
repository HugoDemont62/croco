import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../style/DropdownMenu.css';

interface Course {
  title: string;
  subcategories: string[];
}

const DropdownMenu: React.FC = () => {
  const [courses] = useState<Course[]>([
    { title: 'Cours 1', subcategories: ['Sous-catégorie 1', 'Sous-catégorie 2'] },
    { title: 'Cours 2', subcategories: ['Sous-catégorie A', 'Sous-catégorie B'] },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
      buttonRef.current?.classList.add('open');
    } else {
      gsap.to(menuRef.current, { x: '-100%', duration: 0.5, ease: 'power3.in' });
      buttonRef.current?.classList.remove('open');
    }
  }, [isOpen]);

  return (
    <>
      <button className="burger-button" onClick={() => setIsOpen(!isOpen)} ref={buttonRef}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="dropdown-menu" ref={menuRef}>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              <details>
                <summary>{course.title}</summary>
                <ul>
                  {course.subcategories.map((subcategory, subIndex) => (
                    <li key={subIndex}>{subcategory}</li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DropdownMenu;