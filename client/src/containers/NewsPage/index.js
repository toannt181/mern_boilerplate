import React from 'react'
import styled from 'styled-components'

export const NewsPageWrapper = styled.div`
  padding: 40px;

  .main-content {
    display: flex;
  }

  .category-list {
    flex-basis: 280px;
    margin-right: 48px;
  }

  .new-list {
    flex: 1;
  }
`

export const CategoryItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.small};
  padding: 16px 24px;
  color: ${({ theme }) => theme.colors.gray5};
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  margin-bottom: 16px;

  .icon {
    background: ${({ theme }) => theme.colors.gray14};
    padding: 24px;
    border-radius: ${({ theme }) => theme.radius.small};
    margin-right: 16px;

    .fa {
      font-size: 20px;
    }
  }

  &:hover, .active {
    background: ${({ theme }) => theme.colors.primary};

    .cat-name {
      color: ${({ theme }) => theme.colors.white};
    }

    .icon { 
      background: ${({ theme }) => theme.colors.white};
    }
  }
`

export const NewItemWrapper = styled.div`
  display: flex;
  margin-bottom: 32px;

  .thumb-image {
    height: 140px;
    width: 260px;
    background: center;
    flex-shrink: 0;
    background-size: cover;
    background-image: url('https://ss-images.catscdn.vn/w400/2020/02/10/6964859/untitled-design-31.jpg');
  }

  .new-content {
    flex: 1;
    padding: 8px 16px;

    .title {
    }

    .sub-description {
      margin-bottom: 0;
    }
  }
`

const LIST = [
  { name: 'World', icon: 'fa fa-globe' },
  { name: 'Technology', icon: 'fa fa-clock-o' },
  { name: 'Sport', icon: 'fa fa-futbol-o' },
  { name: 'Culture', icon: 'fa fa-graduation-cap' },
  { name: 'Law', icon: 'fa fa-balance-scale' },
]

const NewsPage = () => {
  return (
    <NewsPageWrapper>
      <h2 className="title is-2 mb-4">News</h2>
      <div className="main-content">
        <div className="category-list">
          {LIST.map(item => (
            <CategoryItem key={item.name}>
              <div className="icon"><span className={item.icon} aria-hidden="true" /></div>
              <div className="cat-name">{item.name}</div>
            </CategoryItem>
          ))}
        </div>
        <div className="new-list">
          {Array(10).fill().map((_, index) => (
            <NewItemWrapper key={index}>
              <div className="thumb-image">
              </div>
              <div className="new-content">
                <div className="title is-4"><a className="is-primary" href="">Gương kia ngự ở trên tường, trắng xinh lộng lẫy dịu dàng Ngọc Trinh</a></div>
                <p className="sub-description"> <span className="fa mr-1 fa-clock-o" aria-hidden="true" /><span>1 minute ago</span></p>
                <p className="sub-description">From <a href="saostar.vn">saostar.vn</a></p>
              </div>
            </NewItemWrapper>
          ))}
        </div>
      </div>
    </NewsPageWrapper>
  )
}

export default NewsPage
