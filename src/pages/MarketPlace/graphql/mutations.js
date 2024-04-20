import {gql} from "@apollo/client";

export const PUBLISH_SECOND_HANDLE_GOODS = gql`
      mutation addGoods($title: String!, $description: String!, $price: Float!, $image: String, $category: String!, $tradePlace: String!, $contact: String!) {
        addGoods(title: $title, description: $description, price: $price, image: $image, category: $category, tradePlace: $tradePlace, contact: $contact) {
          id
          title
        }
      }`;

export const UPDATE_SECOND_HANDLE_GOODS = gql`
      mutation updateGoods($id: ID! $title: String!, $description: String!, $price: Float!, $image: String, $category: String!, $tradePlace: String!, $contact: String!) {
        updateGoods(id: $id, title: $title, description: $description, price: $price, image: $image, category: $category, tradePlace: $tradePlace, contact: $contact) {
          id
          title
        }
      }
    `;

export const ORDER_GOODS = gql`
    mutation buyGoods($goodsId: ID!, $contact: String!) {
        buyGoods(goodsId: $goodsId, contact: $contact) {
          id
        }
     }
`;

