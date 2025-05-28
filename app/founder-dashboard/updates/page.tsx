"use client"
import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Calendar,
  MessageSquare,
  ThumbsUp,
  Share2,
  Edit,
  Trash2,
} from "lucide-react"
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from 'next/image';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { FaSpinner } from 'react-icons/fa6';

export default function UpdatesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [updates, setUpdates] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, error, isLoading } = useUser()
  const [fetchingUpdates, setFetchingUpdates] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    updateType: "",
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [deletingUpdate, setDeletingUpdate] = useState(false)
  const { toast } = useToast()

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  }

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      updateType: "",
    })
    setSelectedFiles([])
    setIsSubmitting(false)
  }

  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!user || isLoading) return

    const userID = user?.sub?.substring(14);

    if (!user) {
      alert("You must be logged in to post an update");
      return;
    }

    if (!formData.title || !formData.content || !formData.updateType) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("updateType", formData.updateType);

      // Append each file to the FormData
      selectedFiles.forEach((file) => {
        formDataToSend.append("attachments", file);
      });

      const response = await fetch(`${API_URL}/api/profile/create-update`, {
        method: "POST",
        headers:{
          user_id: userID,
        },
        body: formDataToSend,
      });

      const result = await response.json();

      // Refresh the updates list
      const updatedResponse = await fetch(
        `${API_URL}/api/profile/get-updates-in-dashboard`,
        {
          headers: {
            user_id: userID,
          },
        }
      );
      const updatedData = await updatedResponse.json();
      setUpdates(updatedData.updates || []);

      // Reset form and close dialog
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating update:", error);
      alert("Failed to create update. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      try {

        if(!user || isLoading) return

        const userID = user?.sub?.substring(14)
        
        const response = await fetch(`${API_URL}/api/profile/get-updates-in-dashboard`, {
          headers: {
            user_id: userID,
          },
        })
        const data = await response.json()
        setUpdates(data.updates || [])
      } catch (error) {
        console.error("Error fetching updates:", error)
      } finally {
        setLoading(false)
        setFetchingUpdates(false)
      }
    }

    fetchUpdates()
  }, [user])

  const handleDeleteUpdate = async (updateId) => {
    if(!user || isLoading) return
    const userID = user?.sub?.substring(14)

    try{
      setDeletingUpdate(true)
      const response = await axios.delete('https://ofStaging.azurewebsites.net/api/profile/delete-update', {
        headers: {
          user_id: userID,
        },
        data: { update_id: updateId },
      })

      if(response.status === 200) {
        setUpdates((prevUpdates) => prevUpdates.filter((update) => update._id !== updateId))
        toast({
          title: "Update Deleted",
          description: "The update has been successfully deleted.",
        })
      }
    }catch (error) {
      console.error("Error deleting update:", error)
      toast({
        title: "Error",
        description: "Failed to delete update. Please try again.",
        variant: "destructive",
      })
    } finally{
      setDeletingUpdate(false)  
    }
  }

  // Filter updates based on active tab
  const filteredUpdates =
    activeTab === "all" ? updates : updates.filter((update) => update.updateType.toLowerCase() === activeTab)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Updates</h1>
            <p className="text-purple-200/70">Keep your investors informed about your progress</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                Post Update
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1F2A3D] border-[#313E54] text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Post Update</DialogTitle>
                <DialogDescription className="text-purple-200/70">
                  Share important news and progress with your investors.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitUpdate}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-white">
                      Title
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      placeholder="Enter update title"
                      className="bg-[#29305F] border-[#313E54] text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="updateType" className="text-sm font-medium text-white">
                      Update Type
                    </label>
                    <Select
                      name="updateType"
                      value={formData.updateType}
                      onValueChange={(value) => handleSelectChange("updateType", value)}
                    >
                      <SelectTrigger className="bg-[#29305F] border-[#313E54] text-white">
                        <SelectValue placeholder="Select update type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#202C41] border-[#313E54] text-white">
                        <SelectItem value="Milestone">Milestone</SelectItem>
                        <SelectItem value="Progress">Progress</SelectItem>
                        <SelectItem value="Announcement">Announcement</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="Team">Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium text-white">
                      Content
                    </label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleFormChange}
                      placeholder="Enter update content"
                      className="bg-[#29305F] border-[#313E54] text-white min-h-[200px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Attachments</label>
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer">
                        <input type="file" multiple onChange={handleFileChange} className="" />
                      </label>
                    </div>
                    {selectedFiles.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-white mb-2">Selected files:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 rounded-md bg-[#1F2A3D] border border-[#313E54]"
                            >
                              <FileText className="h-4 w-4 text-blue-400" />
                              <span className="text-sm text-white">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-[#A3A8AF] hover:text-white"
                                onClick={() => removeFile(index)}
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-white border-[#3D4E6B] bg-[#1F2A3D] hover:bg-[#29305F]"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    {isSubmitting ? "Publishing..." : "Publish Update"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[#1F2A3D] p-1 rounded-lg inline-flex">
            <TabsTrigger value="all" className="data-[state=active]:bg-black data-[state=active]:text-white">
              All Updates
            </TabsTrigger>
            <TabsTrigger value="milestone" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Milestones
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Progress
            </TabsTrigger>
            <TabsTrigger value="announcement" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Announcements
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Financial
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Team
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            {fetchingUpdates ? (
              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardContent className="py-8">
                  <p className="text-center text-[#A3A8AF]">Loading updates...</p>
                </CardContent>
              </Card>
            ) : filteredUpdates.length === 0 ? (
              <Card className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20">
                <CardContent className="py-8">
                  <p className="text-center text-[#A3A8AF]">No updates found.</p>
                </CardContent>
              </Card>
            ) : (
              filteredUpdates.map((update) => (
                <Card
                  key={update._id}
                  className="bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-purple-800/20"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={`
                              ${
                                update.updateType.toLowerCase() === "milestone"
                                  ? "bg-green-900/30 text-green-400 border-green-800"
                                  : update.updateType.toLowerCase() === "progress"
                                    ? "bg-blue-900/30 text-blue-400 border-blue-800"
                                    : update.updateType.toLowerCase() === "announcement"
                                      ? "bg-purple-900/30 text-purple-400 border-purple-800"
                                      : update.updateType.toLowerCase() === "financial"
                                        ? "bg-amber-900/30 text-amber-400 border-amber-800"
                                        : "bg-pink-900/30 text-pink-400 border-pink-800"
                              }
                            `}
                          >
                            {update.updateType}
                          </Badge>
                          <div className="flex items-center text-xs text-[#A3A8AF]">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(update.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <CardTitle className="text-xl text-white">{update.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button onClick={() => handleDeleteUpdate(update._id)} variant="ghost" size="icon" className="h-8 w-8 text-[#A3A8AF] hover:text-white">
                          {deletingUpdate? <FaSpinner className='animate-spin' /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[#A3A8AF] whitespace-pre-line">{update.content}</p>

                    {update.attachments && update.attachments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-white">Attachments</h4>
                        <div className="flex flex-wrap gap-2">
                          {update.attachments.map((attachment, index) => (
                              <Image src={attachment.file_url} alt={attachment.name} width={50} height={50} className="rounded-md" />
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}