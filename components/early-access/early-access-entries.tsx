"use client"
import { API_URL } from '@/lib/config';
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

// Define the EarlyAccessEntry type
type EarlyAccessEntry = {
  id: string
  name: string
  email: string
  twitter: string
  role: "Founder" | "Investor"
  walletAddress: string
  submittedDate: string
  status: "pending" | "accepted" | "rejected"
}

export function EarlyAccessEntries() {
  const [entries, setEntries] = useState<EarlyAccessEntry[]>([])
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Fetch data from the API
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/get-early-access-users?userId=62684`)
        const data: EarlyAccessEntry[] = await response.json()
        setEntries(data)
      } catch (error) {
        console.error("Error fetching entries:", error)
      }
    }
    fetchEntries()
  }, [])

  // Update status (accept/reject) and lock it permanently
  const updateStatus = async (id: string, newStatus: "accepted" | "rejected") => {
    try {
      const response = await fetch(`/api/early-access/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: { "Content-Type": "application/json" },
      })
      // if (!response.ok) throw new Error("Failed to update status")
      // Update UI to reflect the new status
      setEntries((prev) =>
        prev.map((entry) => (entry.id === id ? { ...entry, status: newStatus } : entry))
      )
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  // Copy wallet address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    console.log("Copied to clipboard:", text)
  }

  // Filter entries based on role, status, and search query
  const filteredEntries = entries.filter((entry) => {
    const matchesRole = roleFilter === "all" || entry.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter
    const matchesSearch =
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRole && matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-border"
          />
        </div>
        <div className="flex gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px] border-border">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="founder">Founders</SelectItem>
              <SelectItem value="investor">Investors</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] border-border">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>SL No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>X (Twitter)</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEntries.map((entry, index) => (
              <TableRow key={entry.id} className="border-t border-border">
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{entry.name}</TableCell>
                <TableCell>{entry.email}</TableCell>
                <TableCell>
                  <a
                    href={`https://twitter.com/${entry.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @{entry.twitter}
                  </a>
                </TableCell>
                <TableCell>{entry.role}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="truncate max-w-[120px] sm:max-w-[180px]">{entry.walletAddress}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1 h-6 w-6 text-primary"
                      onClick={() => copyToClipboard(entry.walletAddress)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      entry.status === "accepted"
                        ? "outline"
                        : entry.status === "rejected"
                        ? "destructive"
                        : "secondary"
                    }
                    className="capitalize"
                  >
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {entry.status === "pending" && (
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(entry.id, "accepted")}
                      >
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(entry.id, "rejected")}
                      >
                        <XCircle className="mr-1 h-3 w-3" />
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
