import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { 
  insertClientSchema, insertSessionSchema, insertPayloadSchema,
  insertExploitSchema, insertModuleSchema, insertListenerSchema,
  insertListenerTemplateSchema, insertReportSchema, insertEvidenceSchema,
  insertCommandSchema, insertSettingSchema, PaginationSchema
} from "@shared/schema";

// Helper function for validation
const validateBody = <T>(schema: z.ZodSchema<T>) => (req: any, res: any, next: any) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors
      });
    }
    next(error);
  }
};

const validateQuery = <T>(schema: z.ZodSchema<T>) => (req: any, res: any, next: any) => {
  try {
    req.query = schema.parse(req.query);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Query validation failed",
        details: error.errors
      });
    }
    next(error);
  }
};

// Helper to extract pagination from request
const getPagination = (query: any): PaginationQuery => {
  return {
    page: query.page || 1,
    limit: query.limit || 20
  };
};

// Helper to extract search pagination from request
const getSearchPagination = (query: any): SearchPaginationQuery => {
  return {
    page: query.page || 1,
    limit: query.limit || 20,
    q: query.q
  };
};

// Pagination schema for query params
const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20)
});

// Extended pagination schema for search queries
const searchPaginationQuerySchema = paginationQuerySchema.extend({
  q: z.string().min(1)
});

// Type for pagination query parameters
type PaginationQuery = z.infer<typeof paginationQuerySchema>;
type SearchPaginationQuery = z.infer<typeof searchPaginationQuerySchema>;

export async function registerRoutes(app: Express): Promise<Server> {
  // ========================================
  // Sessions Routes
  // ========================================
  
  // Get all sessions
  app.get("/api/sessions", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getSessions(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch sessions" });
    }
  });

  // Get sessions by status
  app.get("/api/sessions/status/:status", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getSessionsByStatus(req.params.status, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch sessions by status" });
    }
  });

  // Get session by ID
  app.get("/api/sessions/:id", async (req, res) => {
    try {
      const session = await storage.getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ success: false, error: "Session not found" });
      }
      res.json({ success: true, data: session });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch session" });
    }
  });

  // Create session
  app.post("/api/sessions", validateBody(insertSessionSchema), async (req, res) => {
    try {
      const session = await storage.createSession(req.body);
      res.status(201).json({ success: true, data: session });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create session" });
    }
  });

  // Update session
  app.put("/api/sessions/:id", validateBody(insertSessionSchema.partial()), async (req, res) => {
    try {
      const session = await storage.updateSession(req.params.id, req.body);
      if (!session) {
        return res.status(404).json({ success: false, error: "Session not found" });
      }
      res.json({ success: true, data: session });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to update session" });
    }
  });

  // Delete session
  app.delete("/api/sessions/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSession(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Session not found" });
      }
      res.json({ success: true, message: "Session deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to delete session" });
    }
  });

  // ========================================
  // Payloads Routes
  // ========================================
  
  // Get all payloads
  app.get("/api/payloads", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getPayloads(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch payloads" });
    }
  });

  // Get payloads by platform
  app.get("/api/payloads/platform/:platform", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getPayloadsByPlatform(req.params.platform, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch payloads by platform" });
    }
  });

  // Get payload by ID
  app.get("/api/payloads/:id", async (req, res) => {
    try {
      const payload = await storage.getPayload(req.params.id);
      if (!payload) {
        return res.status(404).json({ success: false, error: "Payload not found" });
      }
      res.json({ success: true, data: payload });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch payload" });
    }
  });

  // Create payload
  app.post("/api/payloads", validateBody(insertPayloadSchema), async (req, res) => {
    try {
      const payload = await storage.createPayload(req.body);
      res.status(201).json({ success: true, data: payload });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create payload" });
    }
  });

  // ========================================
  // Exploits Routes
  // ========================================
  
  // Get all exploits
  app.get("/api/exploits", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getExploits(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch exploits" });
    }
  });

  // Get exploits by scope
  app.get("/api/exploits/scope/:scope", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getExploitsByScope(req.params.scope, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch exploits by scope" });
    }
  });

  // Search exploits
  app.get("/api/exploits/search", validateQuery(searchPaginationQuerySchema), async (req, res) => {
    try {
      const query = getSearchPagination(req.query);
      const result = await storage.searchExploits(query.q, { page: query.page, limit: query.limit });
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to search exploits" });
    }
  });

  // Create exploit
  app.post("/api/exploits", validateBody(insertExploitSchema), async (req, res) => {
    try {
      const exploit = await storage.createExploit(req.body);
      res.status(201).json({ success: true, data: exploit });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create exploit" });
    }
  });

  // ========================================
  // Modules Routes
  // ========================================
  
  // Get all modules
  app.get("/api/modules", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getModules(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch modules" });
    }
  });

  // Get modules by category
  app.get("/api/modules/category/:category", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getModulesByCategory(req.params.category, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch modules by category" });
    }
  });

  // Create module
  app.post("/api/modules", validateBody(insertModuleSchema), async (req, res) => {
    try {
      const module = await storage.createModule(req.body);
      res.status(201).json({ success: true, data: module });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create module" });
    }
  });

  // ========================================
  // Listeners Routes
  // ========================================
  
  // Get all listeners
  app.get("/api/listeners", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getListeners(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch listeners" });
    }
  });

  // Get listeners by protocol
  app.get("/api/listeners/protocol/:protocol", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getListenersByProtocol(req.params.protocol, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch listeners by protocol" });
    }
  });

  // Create listener
  app.post("/api/listeners", validateBody(insertListenerSchema), async (req, res) => {
    try {
      const listener = await storage.createListener(req.body);
      res.status(201).json({ success: true, data: listener });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create listener" });
    }
  });

  // ========================================
  // Listener Templates Routes
  // ========================================
  
  // Get all listener templates
  app.get("/api/listeners/templates", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getListenerTemplates(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch listener templates" });
    }
  });

  // Create listener template
  app.post("/api/listeners/templates", validateBody(insertListenerTemplateSchema), async (req, res) => {
    try {
      const template = await storage.createListenerTemplate(req.body);
      res.status(201).json({ success: true, data: template });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create listener template" });
    }
  });

  // ========================================
  // Reports Routes
  // ========================================
  
  // Get all reports
  app.get("/api/reports", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getReports(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch reports" });
    }
  });

  // Get reports by kind
  app.get("/api/reports/kind/:kind", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getReportsByKind(req.params.kind, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch reports by kind" });
    }
  });

  // Create report
  app.post("/api/reports", validateBody(insertReportSchema), async (req, res) => {
    try {
      const report = await storage.createReport(req.body);
      res.status(201).json({ success: true, data: report });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create report" });
    }
  });

  // ========================================
  // Evidence Routes
  // ========================================
  
  // Get evidence by report ID
  app.get("/api/reports/:reportId/evidence", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getEvidenceByReportId(req.params.reportId, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch evidence" });
    }
  });

  // Create evidence
  app.post("/api/evidence", validateBody(insertEvidenceSchema), async (req, res) => {
    try {
      const evidence = await storage.createEvidence(req.body);
      res.status(201).json({ success: true, data: evidence });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create evidence" });
    }
  });

  // ========================================
  // Commands Routes
  // ========================================
  
  // Get commands by session ID
  app.get("/api/sessions/:sessionId/commands", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getCommandsBySessionId(req.params.sessionId, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch commands" });
    }
  });

  // Create command
  app.post("/api/commands", validateBody(insertCommandSchema), async (req, res) => {
    try {
      const command = await storage.createCommand(req.body);
      res.status(201).json({ success: true, data: command });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to create command" });
    }
  });

  // ========================================
  // Settings Routes
  // ========================================
  
  // Get all settings
  app.get("/api/settings", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getSettings(pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch settings" });
    }
  });

  // Get settings by category
  app.get("/api/settings/category/:category", validateQuery(paginationQuerySchema), async (req, res) => {
    try {
      const pagination = getPagination(req.query);
      const result = await storage.getSettingsByCategory(req.params.category, pagination);
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch settings by category" });
    }
  });

  // Create or update setting
  app.post("/api/settings", validateBody(insertSettingSchema), async (req, res) => {
    try {
      const existing = await storage.getSetting(req.body.key);
      if (existing) {
        const updated = await storage.updateSetting(req.body.key, req.body);
        res.json({ success: true, data: updated });
      } else {
        const created = await storage.createSetting(req.body);
        res.status(201).json({ success: true, data: created });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to save setting" });
    }
  });

  // ========================================
  // World Widget Routes
  // ========================================
  
  // Get affected machines for world visualization
  app.get("/api/machines/affected", async (req, res) => {
    try {
      const machines = await storage.getAffectedMachines();
      res.json({ success: true, data: machines });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch affected machines" });
    }
  });

  // Get world statistics
  app.get("/api/world/stats", async (req, res) => {
    try {
      const stats = await storage.getWorldStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch world stats" });
    }
  });

  // Get network activity for real-time visualization
  app.get("/api/world/activity", async (req, res) => {
    try {
      const activity = await storage.getNetworkActivity();
      res.json({ success: true, data: activity });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch network activity" });
    }
  });

  // ========================================
  // Health Check
  // ========================================
  
  app.get("/api/health", (req, res) => {
    res.json({ 
      success: true, 
      message: "C2-CORE API is running",
      timestamp: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
