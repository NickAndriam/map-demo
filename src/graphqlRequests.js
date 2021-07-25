import { gql } from "@apollo/client";

export const GET_FAVORITES = gql`
query MyFavorites {
  myFavorites {
    id
    name
    address
    color
    lnglat
  }
}
`;


export const ADD_FAVORITE = gql`
mutation AddNewFavorite($id: ID!, $name: String!, $address: String!, $color: String!, $lnglat: [Float]) {
    addNewFavorite(id: $id, name: $name, address: $address, color: $color, lnglat: $lnglat) {
      id
      name
      address
      color
      lnglat
    }
  }
`

export const REMOVE_FAVORITE = gql`
   mutation DeleteFavorite($id: ID!) {
    deleteFavorite(id: $id ){
      deleted
      totalBefore
      totalAfter
    }
  }
 `;

