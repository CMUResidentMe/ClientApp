// Importing gql from Apollo Client to construct GraphQL queries
import {gql} from "@apollo/client";

// GraphQL query to fetch a single item by its ID. It retrieves comprehensive details about the item.
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

// GraphQL query to fetch all available goods on the platform. It retrieves a list of goods along with their details.
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

// GraphQL query to check if the current user is the owner of a specific goods item.
export const IS_GOODS_OWNER = gql`
    query isGoodsOwner($goodsId: ID!) {
        isGoodsOwner(goodsId: $goodsId)
      }
      `;

// GraphQL query to fetch all goods posted by the logged-in user. This query includes comprehensive details of each item.
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

// GraphQL query to retrieve all orders made by the user, detailing each purchased item along with buyer and transaction information.
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
          tradePlace
        }
      }
      `;

// GraphQL query to get all goods that have been sold by the user, including detailed information about each transaction and product.
export const GET_SOLD_PRODUCTS = gql`
      query {
        getSoldOrdersByUser {
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
          tradePlace
        }
      }
      `;