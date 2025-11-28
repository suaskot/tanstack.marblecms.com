import type { MarbleAuthorList, MarbleCategoryList, MarblePost, MarblePostList, MarbleTagList } from '@/types/marble'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { requestJson } from '@/lib/http'

export const getPosts = createServerFn().handler(async () => {
  return await requestJson<MarblePostList>('posts')
})

export const getTags = createServerFn().handler(async () => {
  return await requestJson<MarbleTagList>('tags')
})

export const getSinglePost = createServerFn()
  .inputValidator(z.string())
  .handler(async ({ data: slug }) => {
    return await requestJson<MarblePost>(`posts/${slug}`)
  })

export const getCategories = createServerFn().handler(async () => {
  return await requestJson<MarbleCategoryList>('categories')
})

export const getAuthors = createServerFn().handler(async () => {
  return await requestJson<MarbleAuthorList>('authors')
})
