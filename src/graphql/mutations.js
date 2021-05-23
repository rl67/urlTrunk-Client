import { gql } from '@apollo/client';

export const ADD_TAG_LIST = gql`
  mutation AddTagList($name: String!) {
    addTagList(name: $name) {
      id
      name
    }
  }
`;
