"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Camera, Linkedin, Twitter } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"

const teamMemberSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  title: z.string().min(2, { message: "Title is required" }),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters" })
    .max(300, { message: "Bio must be less than 300 characters" }),
  linkedin: z.string().optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
})

type TeamMemberValues = z.infer<typeof teamMemberSchema>

interface CoreTeamFormProps {
  data: any[]
  updateData?: (data: any[]) => void
  onNext: () => void
}

export default function CoreTeamForm({ data, updateData, onNext }: CoreTeamFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, error, isLoading } = useUser()
  const [teamMembers, setTeamMembers] = useState<any[]>(data?.length > 0 ? data : [])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [avatarSrc, setAvatarSrc] = useState<string>("/placeholder.svg?height=100&width=100")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<TeamMemberValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      fullName: "",
      title: "",
      bio: "",
      linkedin: "",
      twitter: "",
    },
  })

  const handleAddMember = (values: TeamMemberValues) => {
    // Check if avatar is provided
    if (!avatarFile) {
      toast({
        title: "Profile picture required",
        description: "Please upload a profile picture for the team member.",
        variant: "destructive",
      })
      return
    }

    const newMember = {
      ...values,
      avatarSrc,
      avatarFile,
    }

    if (editingIndex !== null) {
      // Update existing member
      const updatedMembers = [...teamMembers]
      updatedMembers[editingIndex] = newMember
      setTeamMembers(updatedMembers)
    } else {
      // Add new member
      setTeamMembers([...teamMembers, newMember])
    }

    // Reset form
    form.reset()
    setAvatarSrc("/placeholder.svg?height=100&width=100")
    setAvatarFile(null)
    setEditingIndex(null)
  }

  const handleEditMember = (index: number) => {
    const member = teamMembers[index]
    form.reset({
      fullName: member.fullName,
      title: member.title,
      bio: member.bio,
      linkedin: member.linkedin,
      twitter: member.twitter,
    })
    setAvatarSrc(member.avatarSrc)
    setAvatarFile(member.avatarFile)
    setEditingIndex(index)
  }

  const handleDeleteMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index)
    setTeamMembers(updatedMembers)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarSrc(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = async () => {
    try {
      setIsSubmitting(true)

      // Update data in parent component if updateData is provided
      if (typeof updateData === "function") {
        updateData(teamMembers)
      }

      const userId = user?.sub?.substring(14)

      if (!userId) {
        toast({
          title: "Authentication error",
          description: "Please sign in again to continue.",
          variant: "destructive",
        })
        router.push("/api/auth/login")
        return
      }

      // Only submit team members if there are any
      if (teamMembers.length > 0) {
        // Submit each team member to the API
        for (const member of teamMembers) {
          const formData = new FormData()

          // Add text fields
          formData.append("fullName", member.fullName)
          formData.append("title", member.title)
          formData.append("shortBio", member.bio)

          const socialLinks = {
            linkedin: member.linkedin,
            twitter: member.twitter,
          }

          formData.append("socialLinks", JSON.stringify(socialLinks))

          // Add avatar file if available
          if (member.avatarFile) {
            formData.append("profile_pic_file", member.avatarFile)
          }

          // Send data to API
          const response = await fetch("https://ofStaging.azurewebsites.net/api/startup/add-team-member", {
            method: "POST",
            headers: {
              user_id: userId,
            },
            body: formData,
          })

          // if (!response.ok) {
          //   throw new Error(`API error: ${response.status}`)
          // }
        }
      }

      // Show success toast
      toast({
        title: "Success!",
        description:
          teamMembers.length > 0
            ? "Your team members have been added successfully."
            : "Your information has been saved successfully.",
      })

      // Route to next page
      router.push("/startup-setup/roadMap")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem submitting your team information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return <div className="text-center text-red-500">Error loading user information. Please refresh the page.</div>
  }

  return (
    <div className="flex items-center justify-center mx-auto mt-4 py-4">
      <div className="w-full max-w-4xl">
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Startup Setup</span>
            <span className="text-white font-medium">Step 3 of 5</span>
          </div>
          <Progress
            value={60}
            className="h-2 bg-gray-700"
            indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400"
          />
        </div>
        <div className="bg-gray-900 p-6 rounded-lg">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gray-400">
                Add information about your core team members. A strong team is crucial for investor confidence.
              </p>

              {teamMembers.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {teamMembers.map((member, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar className="h-16 w-16 border-2 border-gray-700">
                          <AvatarImage src={member.avatarSrc} alt={member.fullName} />
                          <AvatarFallback className="bg-gray-700 text-gray-300">
                            {member.fullName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-white">{member.fullName}</h3>
                          <p className="text-sm text-gray-400">{member.title}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300 mb-2">{member.bio}</p>
                        <div className="flex gap-2">
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white"
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                          {member.twitter && (
                            <a
                              href={member.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-white"
                            >
                              <Twitter className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <h3 className="text-lg font-medium text-white">
                    {editingIndex !== null ? "Edit Team Member" : "Add Team Member"}
                  </h3>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddMember)} className="space-y-6">
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                          <Avatar className="h-24 w-24 border-2 border-gray-800">
                            <AvatarImage src={avatarSrc} alt="Profile" />
                            <AvatarFallback className="bg-gray-800 text-gray-400">
                              {form.watch("fullName")
                                ? form
                                    .watch("fullName")
                                    .split(" ")
                                    .map((n: string) => n[0])
                                    .join("")
                                : "TM"}
                            </AvatarFallback>
                          </Avatar>
                          <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 p-1 rounded-full bg-gray-800 border border-gray-700 cursor-pointer"
                          >
                            <Camera className="h-4 w-4 text-gray-400" />
                            <span className="sr-only">Upload avatar</span>
                          </label>
                          <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                          />
                        </div>
                        <p className="text-sm text-gray-400">Upload a professional profile picture<span className="text-red-500 text-sm">*</span></p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Full Name<span className="text-red-500 text-sm">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  className="bg-gray-800 border-gray-700 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Title / Role<span className="text-red-500 text-sm">*</span></FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="CEO & Founder"
                                  className="bg-gray-800 border-gray-700 text-white"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Short Bio<span className="text-red-500 text-sm">*</span></FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief description of experience and expertise..."
                                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-gray-500">
                              {field.value.length}/300 characters
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="linkedin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">LinkedIn Profile URL<span className="text-red-500 text-sm">*</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="https://linkedin.com/in/username"
                                    className="bg-gray-800 border-gray-700 text-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="twitter"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">X (Twitter) Profile URL<span className="text-red-500 text-sm">*</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                  <Input
                                    placeholder="https://twitter.com/username"
                                    className="bg-gray-800 border-gray-700 text-white pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button type="submit" className="bg-black hover:bg-gray-900 text-white border border-gray-800">
                          {editingIndex !== null ? "Update Member" : "Add Member"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-800">
              <a href="/startup-setup/tractionMetrics" className="px-3 py-1.5 rounded-md bg-black hover:bg-gray-900 transition-all duration-200 border border-gray-800 text-white flex items-center gap-1"
              ><ArrowLeft className="h-4 w-4"/> Back </a>
              <Button
                type="button"
                onClick={handleNext}
                className="bg-black hover:bg-gray-900 text-white border border-gray-800"
                disabled={(teamMembers.length === 0 && data?.length === 0) || isSubmitting}
              >
                {isSubmitting
                  ? "Submitting..."
                  : teamMembers.length === 0 && data?.length === 0
                    ? "Add at least one team member"
                    : "Next"}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
