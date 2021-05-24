import { gql } from '@apollo/client';

// Add a new tag list to the database
export const ADD_TAG_LIST = gql`
  mutation AddTagList($name: String!) {
    addTagList(name: $name) {
      id
      name
    }
  }
`;


// Add a new tag to the given tag list
export const ADD_TAG = gql`
  mutation AddTag($name: String!, $tagListId: ID!){
    addTag(name: $name, tagListId: $tagListId) {
      id
      name
    }
  }
`;

// Add a new URL to the database
export const ADD_BOOKMARK = gql`
  mutation AddBookmark($name: String, $url: String!, $note: String) {
    addBookmark(name: $name, url: $url, note: $note) {
      id
      name
    }
  }
`;