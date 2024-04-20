import {gql} from "@apollo/client";

export const GET_GOODS_BY_ID = gql`
      query getGoodsById($id: ID!) {
        getGoodsById(id: $id) {
          id
          title
          description
          price
          image
          category
          tradePlace
          contact
          status
        }
      }
`;

export const GET_ALL_GOODS = gql`
    query {
        getAllGoods {
          id
          title
          description
          price
          image
          category
          tradePlace
          publishUser
          contact
          status
          createdAt
        }
      }
`;

export const IS_GOODS_OWNER = gql`
    query isGoodsOwner($goodsId: ID!) {
        isGoodsOwner(goodsId: $goodsId)
      }
      `;

export const GET_GOODS_OF_USER = gql`
      query {
        getGoodsByUser {
          id
          title
          description
          price
          image
          category
          tradePlace
          contact
          createdAt
        }
      }
    `;

export const GET_ORDERS_BY_USER = gql`
      query {
        getOrdersByUser {
          id
          goods {
                id
                title
                description
                price
                image
                category
                tradePlace
                publishUser
                contact
                status
                createdAt
          }
          buyer
          contact
        }
      }
      `;