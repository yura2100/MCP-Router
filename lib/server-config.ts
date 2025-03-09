import { ServerIcon } from "lucide-react"
import React from "react"

export type ServerState = "not-started" | "needs_configuration" | "active" | "paused"

export interface ToolParameter {
  name: string
  type: string
  required: boolean
  description: string
  customDescription: string
}

export interface Tool {
  id: string
  name: string
  description: string
  enabled: boolean
  customName?: string
  customDescription?: string
  parameters?: ToolParameter[]
}

export interface ServerConfig {
  id: string
  name: string
  description: string
  icon?: React.ReactNode
  category: string
  state: ServerState
  enabled: boolean // Keeping for backward compatibility
  version?: string
  lastUpdated?: string
  popularity?: string
  documentation?: string
  maintainer?: string
  compatibleTools?: string[]
  features?: string[]
  downloads?: string
  stars?: number
  isStarred?: boolean
  tags?: string[]
  tools: Tool[]
  isConfigured?: boolean // Flag to track if server is properly configured
  requiredConfigFields?: string[] // Fields that need to be configured
  [key: string]: any // For additional server-specific properties
}

export const mcpServers: Record<string, ServerConfig> = {
  postgres: {
    id: "postgres",
    name: "Postgres",
    description: "Connect to PostgreSQL databases including Supabase",
    icon: React.createElement(ServerIcon, { className: "h-8 w-8 text-primary" }),
    category: "Database",
    state: "needs_configuration",
    enabled: false,
    connectionString: "",
    schema: "",
    allowedTables: [],
    maxQueryTime: 5000,
    allowedUsers: [],
    securityLevel: "high",
    loggingEnabled: true,
    version: "1.2.0",
    lastUpdated: "2023-12-15",
    popularity: "High",
    documentation: "https://example.com/docs/postgres",
    maintainer: "MCP Router Team",
    compatibleTools: ["Cursor", "Claude Desktop", "Cline"],
    features: ["SQL Query Support", "Schema Introspection", "Data Visualization"],
    downloads: "10.5k",
    stars: 245,
    isStarred: false,
    isConfigured: false,
    requiredConfigFields: ["connectionString", "schema", "allowedTables"],
    tags: ["SQL", "Relational", "Official"],
    tools: [
      {
        id: "query-executor",
        name: "SQL Query Executor",
        description: "Execute SQL queries against your PostgreSQL database",
        enabled: true,
        customName: "",
        customDescription: "",
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "SQL query to execute",
            customDescription: "",
          },
          {
            name: "timeout",
            type: "number",
            required: false,
            description: "Query timeout in milliseconds",
            customDescription: "",
          },
          {
            name: "params",
            type: "array",
            required: false,
            description: "Query parameters for parameterized queries",
            customDescription: "",
          },
        ],
      },
      {
        id: "schema-browser",
        name: "Schema Browser",
        description: "Browse database schema, tables, and relationships",
        enabled: true,
        customName: "",
        customDescription: "",
        parameters: [
          {
            name: "table",
            type: "string",
            required: false,
            description: "Table name to browse (leave empty to list all tables)",
            customDescription: "",
          },
          {
            name: "includeRelations",
            type: "boolean",
            required: false,
            description: "Include foreign key relationships",
            customDescription: "",
          },
        ],
      },
      {
        id: "data-visualizer",
        name: "Data Visualizer",
        description: "Create visualizations from query results",
        enabled: false,
        customName: "",
        customDescription: "",
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "SQL query to visualize",
            customDescription: "",
          },
          {
            name: "type",
            type: "string",
            required: true,
            description: "Visualization type (bar, line, pie, scatter)",
            customDescription: "",
          },
          {
            name: "xAxis",
            type: "string",
            required: false,
            description: "Column to use for X axis",
            customDescription: "",
          },
          {
            name: "yAxis",
            type: "string",
            required: false,
            description: "Column to use for Y axis",
            customDescription: "",
          },
        ],
      },
      {
        id: "query-builder",
        name: "Visual Query Builder",
        description: "Build SQL queries using a visual interface",
        enabled: true,
        customName: "",
        customDescription: "",
        parameters: [
          {
            name: "table",
            type: "string",
            required: true,
            description: "Base table for the query",
            customDescription: "",
          },
          {
            name: "columns",
            type: "array",
            required: false,
            description: "Columns to include (empty for all columns)",
            customDescription: "",
          },
          {
            name: "filters",
            type: "object",
            required: false,
            description: "Query filters in JSON format",
            customDescription: "",
          },
        ],
      },
    ],
  },
  github: {
    id: "github",
    name: "GitHub",
    description: "Access repositories, issues, and pull requests",
    icon: React.createElement(ServerIcon, { className: "h-8 w-8 text-primary" }),
    category: "Development",
    state: "paused",
    enabled: false,
    apiKey: "",
    repositories: ["owner/repo1", "owner/repo2"],
    permissions: ["read", "write"],
    allowedUsers: [],
    securityLevel: "medium",
    loggingEnabled: true,
    version: "0.9.5",
    lastUpdated: "2023-11-20",
    popularity: "Medium",
    documentation: "https://example.com/docs/github",
    maintainer: "MCP Router Team",
    compatibleTools: ["Cursor", "Cline"],
    features: ["Repository Access", "Issue Tracking", "PR Management"],
    downloads: "8.2k",
    stars: 189,
    isStarred: true,
    isConfigured: false,
    requiredConfigFields: ["apiKey", "repositories"],
    tags: ["Git", "Code", "Beta"],
    tools: [
      {
        id: "repo-browser",
        name: "Repository Browser",
        description: "Browse repositories, files, and commit history",
        enabled: true,
        parameters: [
          {
            name: "repo",
            type: "string",
            required: true,
            description: "Repository name in format owner/repo",
            customDescription: "",
          },
          {
            name: "path",
            type: "string",
            required: false,
            description: "File path within repository",
            customDescription: "",
          },
          {
            name: "branch",
            type: "string",
            required: false,
            description: "Branch name (defaults to main/master)",
            customDescription: "",
          },
        ],
      },
      {
        id: "issue-tracker",
        name: "Issue Tracker",
        description: "Search and manage GitHub issues",
        enabled: true,
        parameters: [
          {
            name: "repo",
            type: "string",
            required: true,
            description: "Repository name in format owner/repo",
            customDescription: "",
          },
          {
            name: "state",
            type: "string",
            required: false,
            description: "Issue state (open, closed, all)",
            customDescription: "",
          },
          {
            name: "labels",
            type: "array",
            required: false,
            description: "Filter by issue labels",
            customDescription: "",
          },
        ],
      },
      {
        id: "pr-reviewer",
        name: "PR Reviewer",
        description: "Review and comment on pull requests",
        enabled: false,
        parameters: [
          {
            name: "repo",
            type: "string",
            required: true,
            description: "Repository name in format owner/repo",
            customDescription: "",
          },
          {
            name: "pr",
            type: "number",
            required: true,
            description: "Pull request number",
            customDescription: "",
          },
          {
            name: "comment",
            type: "string",
            required: false,
            description: "Comment to add to the PR",
            customDescription: "",
          },
        ],
      },
      {
        id: "code-search",
        name: "Code Search",
        description: "Search code across repositories",
        enabled: true,
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "Search query",
            customDescription: "",
          },
          {
            name: "repos",
            type: "array",
            required: false,
            description: "Repositories to search (empty for all accessible repos)",
            customDescription: "",
          },
          {
            name: "language",
            type: "string",
            required: false,
            description: "Filter by programming language",
            customDescription: "",
          },
        ],
      },
    ],
  },
  notion: {
    id: "notion",
    name: "Notion",
    description: "Query and update Notion documents and databases",
    icon: React.createElement(ServerIcon, { className: "h-8 w-8 text-primary" }),
    category: "Knowledge Base",
    state: "active",
    enabled: true,
    apiKey: "secret_notion_api_key",
    workspaces: ["workspace1", "workspace2"],
    permissions: ["read"],
    allowedUsers: ["user1@example.com"],
    securityLevel: "medium",
    loggingEnabled: true,
    version: "1.0.2",
    lastUpdated: "2023-12-01",
    popularity: "High",
    documentation: "https://example.com/docs/notion",
    maintainer: "MCP Router Team",
    compatibleTools: ["Cursor", "Claude Desktop", "Cline", "Windsurf"],
    features: ["Document Access", "Database Queries", "Content Creation"],
    downloads: "12.7k",
    stars: 312,
    isStarred: false,
    isConfigured: true,
    requiredConfigFields: ["apiKey", "workspaces"],
    tags: ["Documents", "Notes", "Official"],
    tools: [
      {
        id: "page-browser",
        name: "Page Browser",
        description: "Browse and search Notion pages and databases",
        enabled: true,
        parameters: [
          {
            name: "query",
            type: "string",
            required: false,
            description: "Search query",
            customDescription: "",
          },
          {
            name: "parentId",
            type: "string",
            required: false,
            description: "Parent page ID to limit search scope",
            customDescription: "",
          },
        ],
      },
      {
        id: "content-editor",
        name: "Content Editor",
        description: "Create and edit Notion content",
        enabled: true,
        parameters: [
          {
            name: "pageId",
            type: "string",
            required: true,
            description: "ID of the page to edit",
            customDescription: "",
          },
          {
            name: "content",
            type: "object",
            required: true,
            description: "Content to add in Notion block format",
            customDescription: "",
          },
        ],
      },
      {
        id: "database-query",
        name: "Database Query",
        description: "Query Notion databases with filters and sorts",
        enabled: true,
        parameters: [
          {
            name: "databaseId",
            type: "string",
            required: true,
            description: "ID of the database to query",
            customDescription: "",
          },
          {
            name: "filter",
            type: "object",
            required: false,
            description: "Filter conditions in Notion API format",
            customDescription: "",
          },
          {
            name: "sorts",
            type: "array",
            required: false,
            description: "Sort conditions in Notion API format",
            customDescription: "",
          },
        ],
      },
      {
        id: "page-creator",
        name: "Page Creator",
        description: "Create new pages from templates",
        enabled: false,
        parameters: [
          {
            name: "parentId",
            type: "string",
            required: true,
            description: "Parent page or database ID",
            customDescription: "",
          },
          {
            name: "title",
            type: "string",
            required: true,
            description: "Page title",
            customDescription: "",
          },
          {
            name: "template",
            type: "string",
            required: false,
            description: "Template ID to use (if any)",
            customDescription: "",
          },
        ],
      },
    ],
  },
  "web-search": {
    id: "web-search",
    name: "Web Search",
    description: "Search the web for information",
    icon: React.createElement(ServerIcon, { className: "h-8 w-8 text-primary" }),
    category: "Search",
    state: "not-started",
    enabled: false,
    apiKey: "",
    searchEngines: ["google", "bing"],
    maxResults: 10,
    allowedUsers: [],
    securityLevel: "low",
    loggingEnabled: false,
    version: "0.8.0",
    lastUpdated: "2023-10-15",
    popularity: "Medium",
    documentation: "https://example.com/docs/web-search",
    maintainer: "MCP Router Team",
    compatibleTools: ["Claude Desktop", "Windsurf"],
    features: ["Web Search", "Result Filtering", "Safe Search"],
    downloads: "5.3k",
    stars: 97,
    isStarred: false,
    isConfigured: false,
    requiredConfigFields: ["apiKey", "searchEngines"],
    tags: ["Web", "Search", "Beta"],
    tools: [
      {
        id: "web-search",
        name: "Web Search",
        description: "Search the web for information",
        enabled: true,
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "Search query",
            customDescription: "",
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Maximum number of results",
            customDescription: "",
          },
        ],
      },
      {
        id: "image-search",
        name: "Image Search",
        description: "Search for images on the web",
        enabled: false,
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "Search query",
            customDescription: "",
          },
          {
            name: "size",
            type: "string",
            required: false,
            description: "Image size (small, medium, large)",
            customDescription: "",
          },
        ],
      },
      {
        id: "news-search",
        name: "News Search",
        description: "Search for recent news articles",
        enabled: true,
        parameters: [
          {
            name: "query",
            type: "string",
            required: true,
            description: "Search query",
            customDescription: "",
          },
          {
            name: "days",
            type: "number",
            required: false,
            description: "Maximum age in days",
            customDescription: "",
          },
        ],
      },
    ],
  },
  mongodb: {
    id: "mongodb",
    name: "MongoDB",
    description: "Connect to MongoDB databases",
    icon: React.createElement(ServerIcon, { className: "h-8 w-8 text-primary" }),
    category: "Database",
    state: "not-started",
    enabled: false,
    connectionString: "",
    collections: [],
    maxQueryTime: 3000,
    allowedUsers: [],
    securityLevel: "medium",
    loggingEnabled: true,
    version: "0.7.5",
    lastUpdated: "2023-09-30",
    popularity: "Low",
    documentation: "https://example.com/docs/mongodb",
    maintainer: "Community",
    compatibleTools: ["Cursor", "Cline"],
    features: ["NoSQL Queries", "Collection Management", "Aggregation Pipeline"],
    downloads: "4.1k",
    stars: 76,
    isStarred: false,
    isConfigured: false,
    requiredConfigFields: ["connectionString", "collections"],
    tags: ["NoSQL", "Document", "Community"],
    tools: [
      {
        id: "collection-browser",
        name: "Collection Browser",
        description: "Browse MongoDB collections and documents",
        enabled: true,
        parameters: [
          {
            name: "collection",
            type: "string",
            required: true,
            description: "Collection name",
            customDescription: "",
          },
          {
            name: "limit",
            type: "number",
            required: false,
            description: "Maximum number of documents to return",
            customDescription: "",
          },
        ],
      },
      {
        id: "query-executor",
        name: "Query Executor",
        description: "Execute MongoDB queries",
        enabled: true,
        parameters: [
          {
            name: "collection",
            type: "string",
            required: true,
            description: "Collection name",
            customDescription: "",
          },
          {
            name: "query",
            type: "object",
            required: true,
            description: "MongoDB query in JSON format",
            customDescription: "",
          },
        ],
      },
      {
        id: "aggregation-builder",
        name: "Aggregation Builder",
        description: "Build and execute aggregation pipelines",
        enabled: false,
        parameters: [
          {
            name: "collection",
            type: "string",
            required: true,
            description: "Collection name",
            customDescription: "",
          },
          {
            name: "pipeline",
            type: "array",
            required: true,
            description: "Aggregation pipeline stages in JSON format",
            customDescription: "",
          },
        ],
      },
    ],
  },
  jira: {
    id: "jira",
    name: "Jira",
    description: "Access Jira issues and projects",
    icon: React.createElement(ServerIcon, { className: "h-8 w-8 text-primary" }),
    category: "Development",
    state: "not-started",
    enabled: false,
    apiKey: "",
    domain: "",
    projects: [],
    allowedUsers: [],
    securityLevel: "medium",
    loggingEnabled: true,
    version: "0.6.0",
    lastUpdated: "2023-08-20",
    popularity: "Low",
    documentation: "https://example.com/docs/jira",
    maintainer: "Community",
    compatibleTools: ["Cursor"],
    features: ["Issue Tracking", "Project Management", "Sprint Planning"],
    downloads: "3.8k",
    stars: 64,
    isStarred: false,
    isConfigured: false,
    requiredConfigFields: ["apiKey", "domain", "projects"],
    tags: ["Issues", "Agile", "Community"],
    tools: [
      {
        id: "issue-browser",
        name: "Issue Browser",
        description: "Browse and search Jira issues",
        enabled: true,
        parameters: [
          {
            name: "project",
            type: "string",
            required: false,
            description: "Project key (e.g., PROJ)",
            customDescription: "",
          },
          {
            name: "jql",
            type: "string",
            required: false,
            description: "Jira Query Language (JQL) query",
            customDescription: "",
          },
        ],
      },
      {
        id: "project-viewer",
        name: "Project Viewer",
        description: "View Jira projects and boards",
        enabled: true,
        parameters: [
          {
            name: "project",
            type: "string",
            required: true,
            description: "Project key (e.g., PROJ)",
            customDescription: "",
          },
        ],
      },
      {
        id: "sprint-manager",
        name: "Sprint Manager",
        description: "Manage sprints and backlog",
        enabled: false,
        parameters: [
          {
            name: "project",
            type: "string",
            required: true,
            description: "Project key (e.g., PROJ)",
            customDescription: "",
          },
          {
            name: "board",
            type: "number",
            required: true,
            description: "Board ID",
            customDescription: "",
          },
          {
            name: "sprint",
            type: "number",
            required: false,
            description: "Sprint ID (leave empty for active sprint)",
            customDescription: "",
          },
        ],
      },
    ],
  },
}

