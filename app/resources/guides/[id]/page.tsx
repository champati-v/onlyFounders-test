"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, ThumbsUp, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useUser } from "@auth0/nextjs-auth0/client"
import {useToast} from '../../../../hooks/use-toast'

interface BlogImage {
  file_name: string
  file_url: string
  _id: string
}

interface Blog {
  _id: string
  user_id: string
  title: string
  headerImage: BlogImage
  description: string
  categories: string[]
  content: string
  upvote: number
  upvotedBy: string[]
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  message: string
  blog: Blog
}

export default function BlogDetail() {
  const params = useParams()
  const blogId = params.id as string

  const [blog, setBlog] = useState<Blog | null>(null)
  const [isBlogLoading, setIsBlogLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)
  const [likes, setLikes] = useState(0)
  const [likeLoading, setLikeLoading] = useState(false)
  const { user, isLoading } = useUser()
  const { toast } = useToast()

  const userId = user?.sub?.substring(14)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsBlogLoading(true)

        const response = await fetch(`https://ofstaging.azurewebsites.net/api/blog/get-blog-by-id/${blogId}`)

        const data: ApiResponse = await response.json()
        setBlog(data.blog)
        setLikes(data.blog.upvote || 0)
        setHasLiked(data.blog.upvotedBy?.includes(userId) || false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while fetching the blog")
        console.error(err)
      } finally {
        setIsBlogLoading(false)
      }
    }

    fetchBlog()
  }, [blogId, user, isLoading])

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = async () => {
    try {
      if (!user || isLoading) {
        return
      }

      const userId = user.sub?.substring(14)
      setLikeLoading(true)


      
      const response = await fetch(`https://ofstaging.azurewebsites.net/api/blog/upvote-blog/${blogId}`, {
        method: "POST",
        headers: {
          user_id: userId,
        },
      })

      if (response.status === 200) {
        const data = await response.json()
        setHasLiked(!hasLiked)
        // Update likes count based on whether we're liking or unliking
        setLikes((prev) => (hasLiked ? prev - 1 : prev + 1))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLikeLoading(false)
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Message",
        description: "Blog URL copied to clipboard!",
        variant: "default",
      })
    } catch (err) {
      console.error("Failed to copy URL:", err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isBlogLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-full bg-gray-800 animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-800 animate-pulse rounded"></div>
        </div>

        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-gray-800 animate-pulse rounded"></div>
          <div className="h-4 w-2/3 bg-gray-800 animate-pulse rounded"></div>
          <div className="h-4 w-1/2 bg-gray-800 animate-pulse rounded"></div>
        </div>

        <div className="relative rounded-xl overflow-hidden h-[250px] my-8 bg-gray-800 animate-pulse"></div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <div className="rounded-md bg-gray-900 p-6 mb-10">
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-3/4 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-5/6 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-800 animate-pulse rounded"></div>
                <div className="h-4 w-2/3 bg-gray-800 animate-pulse rounded"></div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-800 pt-6 mb-12">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-20 bg-gray-800 animate-pulse rounded"></div>
                <div className="h-10 w-20 bg-gray-800 animate-pulse rounded"></div>
              </div>
            </div>
          </div>

          <div className="md:w-1/4">
            <div className="sticky top-24">
              <div className="p-6 bg-gray-900 rounded-lg">
                <div className="h-6 w-32 bg-gray-800 animate-pulse rounded mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-20 bg-gray-800 animate-pulse rounded"></div>
                  <div className="h-6 w-24 bg-gray-800 animate-pulse rounded"></div>
                  <div className="h-6 w-16 bg-gray-800 animate-pulse rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button asChild variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Link href="/resources?tab=blogs">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <span className="text-gray-400">Back to Blogs</span>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-white">{blog?.title}</h1>
        <p className="text-gray-400 max-w-3xl">{blog?.description}</p>
      </div>

      <div className="relative rounded-xl overflow-hidden h-[250px] my-8">
        <Image src={blog?.headerImage.file_url || "/placeholder.svg"} alt={blog?.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {blog?.categories.length > 0 && <Badge className="bg-blue-600">{blog?.categories[0]}</Badge>}
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>Published: {formatDate(blog?.createdAt)}</span>
            {blog?.updatedAt !== blog?.createdAt && (
              <>
                <span className="mx-2">•</span>
                <span>Updated: {formatDate(blog?.updatedAt)}</span>
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 p-4"> 
        <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 ${hasLiked ? "text-blue-400" : "text-gray-400 hover:text-blue-400"}`}
                onClick={() => {userId? handleLike() : toast({title: "Message", description: "You must login to like a blog", variant: "default"})}}
              >
                {likeLoading ? (
                  <div>loading...</div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-5 w-5" fill={hasLiked ? "currentColor" : "none"} />
                    <span>{hasLiked ? "Liked" : "Like"}</span>
                  </div>
                )}
              </Button>
              <Button
                onClick={() => {
                  handleShare()
                }}
                variant="ghost"
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-400"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </Button>
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <div className="rounded-md bg-gray-900 p-6 mb-10">
            <div className="prose prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: blog?.content }} />
          </div>
          <div className="flex items-center justify-between border-t border-gray-800 pt-6 mb-12">
          </div>
        </div>

        <div className="md:w-1/4">
          <div className="sticky top-24">
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {blog?.categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="mr-2 mb-2 bg-gray-800 border-gray-700 text-gray-400"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
