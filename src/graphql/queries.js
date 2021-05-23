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