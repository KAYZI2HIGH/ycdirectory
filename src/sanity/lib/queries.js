import { defineQuery } from "next-sanity";

export const STARTUP_QUERIES =
  defineQuery(` *[_type == 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search || author->username match $search] | order(_createdAt desc) {
  _id, slug, views, description, title,_createdAt, pitch, category,image, 
    author -> {_id, name, image, bio}
}`);

export const STARTUP_BY_ID_QUERY = defineQuery(`
  *[_type == 'startup' && _id == $id][0] {
  _id, slug, views, description, title, _createdAt, pitch, category, image, 
    author->{_id, name,username, image, bio}
}
  `);

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == 'startup' && _id == $id][0] {
    _id, views
    }`);

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`
      *[_type == 'author' && id == $id][0] {
      _id, id, name, username, email, image, bio}`);

export const AUTHOR_BY_SANITY_ID_QUERY = defineQuery(`
  *[_type == 'author' && _id == $id][0] {
  _id, id, name, username, email, image, bio}`);

export const STARTUP_BY_AUTHOR_ID_QUERY = defineQuery(`
  *[_type == 'startup' && author._ref == $id] {
   _id, slug, views, description, title, _createdAt, pitch, category, image, 
    author->{_id, name,username, image, bio}
  }
  `);
