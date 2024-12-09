/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const N5quizBookmarkLazyImport = createFileRoute('/n5quizBookmark')()
const N5quizLazyImport = createFileRoute('/n5quiz')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const N5quizBookmarkLazyRoute = N5quizBookmarkLazyImport.update({
  id: '/n5quizBookmark',
  path: '/n5quizBookmark',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/n5quizBookmark.lazy').then((d) => d.Route),
)

const N5quizLazyRoute = N5quizLazyImport.update({
  id: '/n5quiz',
  path: '/n5quiz',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/n5quiz.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/n5quiz': {
      id: '/n5quiz'
      path: '/n5quiz'
      fullPath: '/n5quiz'
      preLoaderRoute: typeof N5quizLazyImport
      parentRoute: typeof rootRoute
    }
    '/n5quizBookmark': {
      id: '/n5quizBookmark'
      path: '/n5quizBookmark'
      fullPath: '/n5quizBookmark'
      preLoaderRoute: typeof N5quizBookmarkLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/n5quiz': typeof N5quizLazyRoute
  '/n5quizBookmark': typeof N5quizBookmarkLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/n5quiz': typeof N5quizLazyRoute
  '/n5quizBookmark': typeof N5quizBookmarkLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/n5quiz': typeof N5quizLazyRoute
  '/n5quizBookmark': typeof N5quizBookmarkLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/n5quiz' | '/n5quizBookmark'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/n5quiz' | '/n5quizBookmark'
  id: '__root__' | '/' | '/n5quiz' | '/n5quizBookmark'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  N5quizLazyRoute: typeof N5quizLazyRoute
  N5quizBookmarkLazyRoute: typeof N5quizBookmarkLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  N5quizLazyRoute: N5quizLazyRoute,
  N5quizBookmarkLazyRoute: N5quizBookmarkLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/n5quiz",
        "/n5quizBookmark"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/n5quiz": {
      "filePath": "n5quiz.lazy.tsx"
    },
    "/n5quizBookmark": {
      "filePath": "n5quizBookmark.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
