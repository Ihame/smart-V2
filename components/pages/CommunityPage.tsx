"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../Button"
import { Icon } from "../Icon"
import { useLanguage } from "../../contexts/LanguageContext"
import { useAuth } from "../../contexts/AuthContext"
import { useCommunity } from "../../contexts/CommunityContext"
import { AuthStatus } from "../../types"

export const CommunityPage: React.FC = () => {
  const { translate } = useLanguage()
  const { authStatus, currentUser } = useAuth()
  const { posts, addPost, isLoadingPosts } = useCommunity()

  const [newPostContent, setNewPostContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmitPost = async () => {
    if (!newPostContent.trim()) {
      setError("Please enter some content for your post")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await addPost(newPostContent)
      setNewPostContent("")
    } catch (err) {
      setError("Failed to post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {translate("community.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connect with fellow EV and hybrid vehicle owners across Africa
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,200+</div>
            <div className="text-gray-600 dark:text-gray-300">Active Members</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">450+</div>
            <div className="text-gray-600 dark:text-gray-300">Posts This Month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">89%</div>
            <div className="text-gray-600 dark:text-gray-300">Questions Answered</div>
          </div>
        </div>

        {/* New Post Section */}
        {authStatus === AuthStatus.AUTHENTICATED ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Icon name="user" size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder={translate("community.shareThoughts")}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                />
                {error && (
                  <div className="mt-2 p-2 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md">
                    <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
                  </div>
                )}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {newPostContent.length}/500 characters
                  </span>
                  <Button onClick={handleSubmitPost} disabled={isSubmitting || newPostContent.length > 500}>
                    {isSubmitting ? (
                      <>
                        <Icon name="loader" size={16} className="mr-2 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Icon name="plus" size={16} className="mr-2" />
                        Post
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 mb-8 text-center">
            <Icon name="users" size={48} className="mx-auto text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {translate("community.loginToEngage")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join our community to share experiences, ask questions, and connect with other EV owners.
            </p>
            <Button>Join the Community</Button>
          </div>
        )}

        {/* Community Guidelines */}
        <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Icon name="info" size={24} className="text-yellow-600 dark:text-yellow-400 mr-3 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Community Guidelines</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>• Be respectful and helpful to fellow community members</li>
                <li>• Share accurate information and experiences</li>
                <li>• Keep discussions relevant to EV and hybrid vehicles</li>
                <li>• No spam, promotional content, or inappropriate material</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {isLoadingPosts ? (
            <div className="text-center py-8">
              <Icon name="loader" size={32} className="mx-auto text-blue-600 dark:text-blue-400 mb-4 animate-spin" />
              <p className="text-gray-600 dark:text-gray-300">Loading community posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="message-circle" size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {translate("community.noPostsYet")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Be the first to start a conversation in our community!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <Icon name="user" size={20} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {post.author_name || "Community Member"}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {post.created_at && formatDate(post.created_at)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{post.content}</p>
                    <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                      <button className="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
                        <Icon name="heart" size={16} className="mr-1" />
                        Like
                      </button>
                      <button className="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
                        <Icon name="message-circle" size={16} className="mr-1" />
                        Reply
                      </button>
                      <button className="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
                        <Icon name="share" size={16} className="mr-1" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Popular Topics */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Popular Topics</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Battery Life",
              "Charging Tips",
              "Maintenance",
              "Cost Savings",
              "Road Trips",
              "Winter Driving",
              "Hybrid vs EV",
              "Government Incentives",
            ].map((topic) => (
              <span
                key={topic}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800"
              >
                #{topic.replace(" ", "")}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
