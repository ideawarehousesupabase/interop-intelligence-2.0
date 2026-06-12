import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, ChevronRight, Search, Filter } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { integrations as initial } from "../data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/projects/")({ component: Projects });

const statusColor: Record<string, string> = {
  Ongoing: "bg-info/15 text-info border-info/30",
  Completed: "bg-success/15 text-success border-success/30",
};

function Projects() {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", source: "", destination: "", description: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const onAdd = () => {
    if (!form.name) return;
    setItems([
      {
        id: `int-${Date.now()}`,
        name: form.name,
        source: form.source,
        destination: form.destination,
        status: "Ongoing",
        lastSync: "just now",
        health: 100,
        updated: new Date().toISOString().slice(0, 10),
      },
      ...items,
    ]);
    setForm({ name: "", source: "", destination: "", description: "" });
    setOpen(false);
    toast.success("Project added");
  };

  const filteredItems = items.filter((i) => {
    const matchesSearch =
      searchQuery === "" ||
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage HL7 → FHIR pipelines across source and destination systems.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Project name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Radiology HL7 Feed"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Source type</Label>
                  <Select
                    value={form.source}
                    onValueChange={(v) => setForm({ ...form, source: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["HL7 v2", "HL7 v3", "CDA", "Custom XML", "CSV"].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Destination type</Label>
                  <Select
                    value={form.destination}
                    onValueChange={(v) => setForm({ ...form, destination: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {["FHIR R4", "NHS Spine", "UK Core", "Custom API"].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description of this pipeline…"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onAdd}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name, source, or destination…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {(searchQuery || statusFilter !== "all") && (
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>
              Showing {filteredItems.length} of {items.length} projects
            </span>
            {(searchQuery || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="text-primary hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </Card>

      <Card>
        <div className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Project</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Destination</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Last Updated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">
                    No projects match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((i) => (
                  <tr key={i.id} className="hover:bg-muted/30 group">
                    <td className="px-5 py-3.5 font-medium">{i.name}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{i.source}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{i.destination}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className={statusColor[i.status]}>
                        {i.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5 text-muted-foreground tabular-nums">{i.updated}</td>
                    <td className="px-5 py-3.5 text-right">
                      <Button variant="outline" size="sm" asChild className="h-8 text-xs">
                        <Link to="/projects/$id" params={{ id: i.id }}>
                          View <ChevronRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
