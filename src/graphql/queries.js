import { gql } from '@apollo/client';

export const LOAD_TAGLISTS = gql`
    query getTagLists{
        tagLists{
            id
            name
        }
    }
`;

export const LOAD_TAGS = gql`
    query getTags{
        tags{
            id
            name
        }
    }
`;

export const LAOD_TAGS_FOR_TAGLIST = gql`
    query getTagsForTagList($id: ID!){
        tagList(id: $id) {
            name
            tags {
                id
                name
            }
        }
    }
`;

// Get Bookmarks by tags
/*
query getBookmarks($tags: [ID]){
  bookmarksByTags(tags: $tags) {
    id
		name
  }
}
variables:
{
  "tags": [
    "609d7e331b152b6fc5cd0ae4",
    "609d7e4c1b152b6fc5cd0ae5"
  ]
}

*/
export const GET_BOOKMARKS = gql`
    query getBookmarks($tags: [ID!]) {
        bookmarksByTags(tags: $tags) {
            id
            name
            url
            note
        }
    }
`;