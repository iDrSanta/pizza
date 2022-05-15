import React from 'react';

// interface ICategory {
//   title: string;
//   id: number;
// }

// const arrCategory: ICategory[] = [
//   { title: 'Все', id: 0 },
//   { title: 'Мясные', id: 1 },
//   { title: 'Вегетарианская', id: 2 },
//   { title: 'Гриль', id: 3 },
//   { title: 'Острые', id: 4 },
//   { title: 'Закрытые', id: 5 },
// ];

interface IProps {
  value: number;
  onChangeCategory: (id: number) => void;
}

export const Categories: React.FC<IProps> = ({ value, onChangeCategory }) => {
  const categoryName = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  // const onClickCategory = (index: number) => {
  //   setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categoryName.map((category, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
