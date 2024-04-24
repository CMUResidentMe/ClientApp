// Importing gql from Apollo Client to create GraphQL queries
import {gql} from "@apollo/client";

// GraphQL mutation to add new goods to the platform. Requires several fields including title, description, price, etc.
export const PUBLISH_SECOND_HANDLE_GOODS = gql`
      mutation addGoods($title: String!, $description: String!, $price: Float!, $image: String, $category: String!, $tradePlace: String!, $contact: String!) {
        addGoods(title: $title, description: $description, price: $price, image: $image, category: $category, tradePlace: $tradePlace, contact: $contact) {
          id
          title
        }
      }`;

// GraphQL mutation to update existing goods on the platform. This mutation needs an id to identify the item to update along with the new details.
export const UPDATE_SECOND_HANDLE_GOODS = gql`
      mutation updateGoods($id: ID! $title: String!, $description: String!, $price: Float!, $image: String, $category: String!, $tradePlace: String!, $contact: String!) {
        updateGoods(id: $id, title: $title, description: $description, price: $price, image: $image, category: $category, tradePlace: $tradePlace, contact: $contact) {
          id
          title
        }
      }
    `;

// GraphQL mutation for purchasing goods. It requires the ID of the goods and details about the trade place and contact information.
export const ORDER_GOODS = gql`
    mutation buyGoods($goodsId: ID!, $contact: String!, $tradePlace: String!) {
        buyGoods(goodsId: $goodsId, contact: $contact, tradePlace: $tradePlace) {
          id
        }
     }
`;

// GraphQL mutation to delete goods from the platform using the goods' ID.
export const DELETE_GOODS = gql`
    mutation deleteGoods($id: ID!) {
        deleteGoods(id: $id)
      }
`
