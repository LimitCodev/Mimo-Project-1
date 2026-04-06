# DevOps Arena - Arquitectura Técnica Completa

## 📋 Información General

**Proyecto:** Simulador Multiplayer de Infraestructura Cloud (Kubernetes + Docker)  
**Plataforma:** Mimo (React 18 + Node.js + Express 5 + SQLite)  
**Tiempo estimado:** 6 semanas (1 persona, medio tiempo)  
**Nivel de complejidad:** 🔥🔥🔥🔥🔥 (Muy Alta)

---

## 🎯 Objetivos del Proyecto

1. Simulador completo de cluster Kubernetes (pods, services, deployments)
2. Terminal interactiva con comandos kubectl simulados
3. Multiplayer real-time con WebSockets (5-10 usuarios)
4. Event Sourcing para time-travel debugging
5. Chaos Engineering integrado (inyectar fallos)
6. Monitoring dashboard en tiempo real
7. Resource scheduling con algoritmos reales
8. Sistema educativo con desafíos

---

## 🏗️ Arquitectura General (Event-Driven + CQRS)

```
┌────────────────────────────────────────────────────────────────┐
│                      FRONTEND (React 18)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐   │
│  │  Cluster    │  │   Terminal   │  │   Monitoring        │   │
│  │  Topology   │  │  (Xterm.js)  │  │   Dashboard         │   │
│  │  (D3.js)    │  │              │  │                     │   │
│  └─────────────┘  └──────────────┘  └─────────────────────┘   │
│         │                │                     │               │
│         └────────────────┴─────────────────────┘               │
│                          │                                     │
│                  ┌───────▼────────┐                            │
│                  │   WebSocket    │ ← Real-time multiplayer    │
│                  └───────┬────────┘                            │
└──────────────────────────┼─────────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────────┐
│                   BACKEND (Express 5)                          │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              COMMAND SIDE (Write Model)                  │ │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐  │ │
│  │  │ Commands   │  │ Command      │  │ Domain          │  │ │
│  │  │ (Actions)  │→ │ Handlers     │→ │ Aggregates      │  │ │
│  │  └────────────┘  └──────────────┘  └─────────────────┘  │ │
│  │         │                                    │           │ │
│  │         └────────────────────────────────────┘           │ │
│  │                          ▼                               │ │
│  │                  ┌───────────────┐                       │ │
│  │                  │  Event Store  │ ← Immutable events    │ │
│  │                  │   (SQLite)    │                       │ │
│  │                  └───────┬───────┘                       │ │
│  └──────────────────────────┼───────────────────────────────┘ │
│                             │                                 │
│  ┌──────────────────────────▼───────────────────────────────┐ │
│  │              QUERY SIDE (Read Model)                     │ │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐  │ │
│  │  │ Event      │  │ Projections  │  │ Query Models    │  │ │
│  │  │ Handlers   │→ │ (Update)     │→ │ (Optimized)     │  │ │
│  │  └────────────┘  └──────────────┘  └─────────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                 DOMAIN SERVICES                          │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │  │ Orchestrator │  │  Scheduler   │  │ Chaos Engine │  │ │
│  │  │ (Reconcile)  │  │ (Placement)  │  │ (Failures)   │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │               WEBSOCKET MANAGER                          │ │
│  │  - Broadcast events to all connected clients             │ │
│  │  - Room-based isolation (per cluster)                    │ │
│  │  - Presence tracking                                     │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas Completa

```
devops-arena/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── cluster/
│   │   │   │   ├── ClusterTopology.tsx         # D3.js force graph
│   │   │   │   ├── NodeCard.tsx                # Individual node
│   │   │   │   ├── PodCard.tsx                 # Pod visualization
│   │   │   │   ├── ServiceCard.tsx             # Service endpoints
│   │   │   │   └── ClusterControls.tsx         # Zoom, filter, etc.
│   │   │   │
│   │   │   ├── terminal/
│   │   │   │   ├── Terminal.tsx                # Xterm.js wrapper
│   │   │   │   ├── CommandParser.tsx           # Parse kubectl commands
│   │   │   │   ├── Autocomplete.tsx            # Command suggestions
│   │   │   │   └── CommandHistory.tsx          # History navigation
│   │   │   │
│   │   │   ├── resources/
│   │   │   │   ├── PodCreator.tsx              # Form to create pods
│   │   │   │   ├── DeploymentCreator.tsx       # Deployment manifest
│   │   │   │   ├── ServiceCreator.tsx          # Service config
│   │   │   │   └── YAMLEditor.tsx              # Monaco YAML editor
│   │   │   │
│   │   │   ├── monitoring/
│   │   │   │   ├── ResourceUsageChart.tsx      # CPU/RAM over time
│   │   │   │   ├── EventsTimeline.tsx          # Cluster events
│   │   │   │   ├── PodStatusTable.tsx          # All pods status
│   │   │   │   ├── MetricsCards.tsx            # Key metrics
│   │   │   │   └── AlertsList.tsx              # Active alerts
│   │   │   │
│   │   │   ├── chaos/
│   │   │   │   ├── ChaosLab.tsx                # Chaos engineering UI
│   │   │   │   ├── FailureInjector.tsx         # Inject failures
│   │   │   │   ├── ExperimentRunner.tsx        # Run chaos experiments
│   │   │   │   └── ImpactAnalysis.tsx          # Analyze impact
│   │   │   │
│   │   │   ├── multiplayer/
│   │   │   │   ├── UserPresence.tsx            # Who's online
│   │   │   │   ├── CollaborativeCursor.tsx     # See other users' actions
│   │   │   │   ├── ChatPanel.tsx               # Team chat
│   │   │   │   └── ActivityFeed.tsx            # Recent actions
│   │   │   │
│   │   │   └── shared/
│   │   │       ├── Layout.tsx
│   │   │       ├── ResizablePanels.tsx         # Split view
│   │   │       ├── StatusBadge.tsx             # Running, Pending, etc.
│   │   │       └── CodeBlock.tsx
│   │   │
│   │   ├── lib/
│   │   │   ├── k8s/
│   │   │   │   ├── types.ts                    # K8s resource types
│   │   │   │   ├── yaml-parser.ts              # YAML ↔ JS
│   │   │   │   ├── resource-validator.ts       # Validate manifests
│   │   │   │   └── kubectl-simulator.ts        # Simulate kubectl
│   │   │   │
│   │   │   ├── state-machine/
│   │   │   │   ├── pod-fsm.ts                  # Pod lifecycle FSM
│   │   │   │   ├── deployment-fsm.ts           # Deployment FSM
│   │   │   │   └── service-fsm.ts              # Service FSM
│   │   │   │
│   │   │   ├── visualization/
│   │   │   │   ├── d3-helpers.ts               # D3.js utilities
│   │   │   │   ├── force-layout.ts             # Force-directed graph
│   │   │   │   └── topology-renderer.ts        # Cluster rendering
│   │   │   │
│   │   │   ├── websocket/
│   │   │   │   ├── client.ts                   # WS client wrapper
│   │   │   │   ├── event-handlers.ts           # Handle server events
│   │   │   │   └── reconnection.ts             # Auto-reconnect logic
│   │   │   │
│   │   │   └── utils/
│   │   │       ├── resource-utils.ts
│   │   │       └── time-utils.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── cluster-store.ts                # Zustand: Cluster state
│   │   │   ├── resources-store.ts              # Pods, Services, etc.
│   │   │   ├── events-store.ts                 # Event stream
│   │   │   ├── multiplayer-store.ts            # Connected users
│   │   │   └── ui-store.ts                     # UI preferences
│   │   │
│   │   ├── hooks/
│   │   │   ├── useWebSocket.ts                 # WebSocket connection
│   │   │   ├── useCluster.ts                   # Cluster operations
│   │   │   ├── useEventSourcing.ts             # Event replay
│   │   │   ├── useTerminal.ts                  # Terminal logic
│   │   │   └── useCollaboration.ts             # Multiplayer
│   │   │
│   │   ├── workers/
│   │   │   └── event-processor.worker.ts       # Process events
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── devops-theme.css
│   │   │   └── responsive.css
│   │   │
│   │   ├── types/
│   │   │   ├── k8s.types.ts
│   │   │   ├── events.types.ts
│   │   │   ├── websocket.types.ts
│   │   │   └── api.types.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── domain/
│   │   │   ├── cluster/
│   │   │   │   ├── Cluster.ts                  # Cluster aggregate
│   │   │   │   ├── ClusterCommands.ts          # Command types
│   │   │   │   ├── ClusterEvents.ts            # Event types
│   │   │   │   └── ClusterHandlers.ts          # Command handlers
│   │   │   │
│   │   │   ├── pod/
│   │   │   │   ├── Pod.ts                      # Pod aggregate
│   │   │   │   ├── PodLifecycle.ts             # FSM logic
│   │   │   │   ├── PodCommands.ts
│   │   │   │   ├── PodEvents.ts
│   │   │   │   └── PodHandlers.ts
│   │   │   │
│   │   │   ├── deployment/
│   │   │   │   ├── Deployment.ts
│   │   │   │   ├── DeploymentStrategy.ts       # RollingUpdate, Recreate
│   │   │   │   ├── DeploymentCommands.ts
│   │   │   │   ├── DeploymentEvents.ts
│   │   │   │   └── DeploymentHandlers.ts
│   │   │   │
│   │   │   └── service/
│   │   │       ├── Service.ts
│   │   │       ├── ServiceCommands.ts
│   │   │       ├── ServiceEvents.ts
│   │   │       └── ServiceHandlers.ts
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── event-store/
│   │   │   │   ├── EventStore.ts               # Event persistence
│   │   │   │   ├── EventPublisher.ts           # Publish to subscribers
│   │   │   │   └── Snapshot.ts                 # Snapshot for performance
│   │   │   │
│   │   │   ├── projections/
│   │   │   │   ├── ClusterViewProjection.ts    # Read model
│   │   │   │   ├── PodStatusProjection.ts      # Pod status view
│   │   │   │   └── ResourceUsageProjection.ts  # Metrics view
│   │   │   │
│   │   │   ├── websocket/
│   │   │   │   ├── WebSocketManager.ts         # WS server
│   │   │   │   ├── RoomManager.ts              # Cluster rooms
│   │   │   │   └── PresenceTracker.ts          # Online users
│   │   │   │
│   │   │   └── cqrs/
│   │   │       ├── CommandBus.ts               # Route commands
│   │   │       ├── QueryBus.ts                 # Route queries
│   │   │       └── EventBus.ts                 # Event distribution
│   │   │
│   │   ├── services/
│   │   │   ├── orchestrator/
│   │   │   │   ├── Reconciler.ts               # K8s reconciliation loop
│   │   │   │   ├── ControllerManager.ts        # Controllers
│   │   │   │   └── WatchLoop.ts                # Watch resources
│   │   │   │
│   │   │   ├── scheduler/
│   │   │   │   ├── Scheduler.ts                # Pod placement
│   │   │   │   ├── NodeSelector.ts             # Node selection algorithm
│   │   │   │   ├── ResourceCalculator.ts       # Available resources
│   │   │   │   └── PriorityQueue.ts            # Pod priority
│   │   │   │
│   │   │   ├── chaos/
│   │   │   │   ├── ChaosEngine.ts              # Inject failures
│   │   │   │   ├── Experiments.ts              # Chaos experiments
│   │   │   │   └── FailureTypes.ts             # Pod kill, network lag
│   │   │   │
│   │   │   └── monitoring/
│   │   │       ├── MetricsCollector.ts         # Collect metrics
│   │   │       ├── AlertManager.ts             # Trigger alerts
│   │   │       └── EventLogger.ts              # Log events
│   │   │
│   │   ├── routes/
│   │   │   ├── clusters.ts                     # Cluster CRUD
│   │   │   ├── pods.ts                         # Pod operations
│   │   │   ├── deployments.ts                  # Deployment operations
│   │   │   ├── services.ts                     # Service operations
│   │   │   ├── events.ts                       # Event stream
│   │   │   ├── chaos.ts                        # Chaos experiments
│   │   │   └── monitoring.ts                   # Metrics + alerts
│   │   │
│   │   ├── db/
│   │   │   ├── schema.ts                       # Kysely schema
│   │   │   ├── migrations/
│   │   │   │   ├── 001_event_store.ts          # Event store tables
│   │   │   │   ├── 002_projections.ts          # Read models
│   │   │   │   └── 003_monitoring.ts           # Metrics tables
│   │   │   ├── queries/
│   │   │   │   ├── event-store.queries.ts
│   │   │   │   ├── cluster-view.queries.ts
│   │   │   │   └── metrics.queries.ts
│   │   │   └── connection.ts
│   │   │
│   │   ├── kubectl/
│   │   │   ├── CommandExecutor.ts              # Execute kubectl commands
│   │   │   ├── CommandRegistry.ts              # Available commands
│   │   │   └── OutputFormatter.ts              # Format output
│   │   │
│   │   ├── middleware/
│   │   │   ├── error-handler.ts
│   │   │   ├── validation.ts
│   │   │   └── auth.ts                         # Basic auth (optional)
│   │   │
│   │   ├── utils/
│   │   │   ├── yaml-utils.ts
│   │   │   ├── k8s-utils.ts
│   │   │   └── event-utils.ts
│   │   │
│   │   └── server.ts
│   │
│   └── package.json
│
├── shared/
│   ├── types/
│   │   ├── k8s.ts                              # K8s resource types
│   │   ├── events.ts                           # Event types
│   │   ├── commands.ts                         # Command types
│   │   └── api.ts
│   │
│   └── constants/
│       ├── pod-phases.ts                       # Pending, Running, etc.
│       └── resource-types.ts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── EVENT_SOURCING.md
│   ├── K8S_BASICS.md
│   └── API.md
│
├── scripts/
│   ├── seed-clusters.ts
│   └── benchmark.ts
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄️ Schema SQLite Detallado (Event-Driven)

```typescript
// db/schema.ts
import { Generated, Insertable, Selectable, Updateable } from 'kysely';

// ============================================================================
// EVENT STORE (Core - Immutable)
// ============================================================================
export interface EventsTable {
  id: Generated<number>;
  
  // Event identity
  event_id: string;                 // UUID
  event_type: string;               // "PodCreated", "DeploymentUpdated"
  
  // Aggregate info
  aggregate_id: string;             // cluster-123, pod-456
  aggregate_type: string;           // "Cluster", "Pod", "Deployment"
  
  // Event data
  payload: string;                  // JSON of event data
  
  // Metadata
  metadata: string;                 // JSON: {user, timestamp, causation_id}
  
  // Versioning (for optimistic locking)
  version: number;                  // Incremental per aggregate
  
  // Timestamp
  created_at: string;               // ISO 8601
}

// ============================================================================
// SNAPSHOTS (Performance optimization)
// ============================================================================
export interface SnapshotsTable {
  id: Generated<number>;
  
  aggregate_id: string;
  aggregate_type: string;
  
  // Snapshot data
  state: string;                    // JSON of full aggregate state
  version: number;                  // Event version at snapshot time
  
  created_at: string;
}

// ============================================================================
// PROJECTIONS - CLUSTER VIEW (Read Model)
// ============================================================================
export interface ClusterViewTable {
  id: Generated<number>;
  cluster_id: string;               // Unique cluster ID
  
  name: string;
  status: 'creating' | 'running' | 'degraded' | 'stopped';
  
  // Cluster info
  num_nodes: number;
  num_pods: number;
  num_services: number;
  num_deployments: number;
  
  // Resource capacity
  total_cpu_cores: number;
  total_memory_gb: number;
  
  // Resource usage
  used_cpu_cores: number;
  used_memory_gb: number;
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// PROJECTIONS - POD STATUS VIEW
// ============================================================================
export interface PodStatusViewTable {
  id: Generated<number>;
  
  pod_id: string;
  cluster_id: string;
  
  name: string;
  namespace: string;
  
  // Status
  phase: 'Pending' | 'Running' | 'Succeeded' | 'Failed' | 'Unknown';
  status: string;                   // Ready, NotReady, etc.
  
  // Spec
  image: string;
  node_name: string | null;
  
  // Resources
  cpu_request: number;              // millicores
  memory_request: number;           // MB
  cpu_limit: number | null;
  memory_limit: number | null;
  
  // Metrics
  cpu_usage: number | null;         // Current usage
  memory_usage: number | null;
  
  // Timestamps
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
  updated_at: string;
}

// ============================================================================
// PROJECTIONS - DEPLOYMENT VIEW
// ============================================================================
export interface DeploymentViewTable {
  id: Generated<number>;
  
  deployment_id: string;
  cluster_id: string;
  
  name: string;
  namespace: string;
  
  // Spec
  replicas: number;                 // Desired
  available_replicas: number;       // Current
  ready_replicas: number;
  
  // Strategy
  strategy_type: 'RollingUpdate' | 'Recreate';
  
  // Image
  image: string;
  image_tag: string;
  
  // Status
  status: 'Progressing' | 'Available' | 'Degraded';
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// PROJECTIONS - SERVICE VIEW
// ============================================================================
export interface ServiceViewTable {
  id: Generated<number>;
  
  service_id: string;
  cluster_id: string;
  
  name: string;
  namespace: string;
  
  // Type
  type: 'ClusterIP' | 'NodePort' | 'LoadBalancer';
  
  // Endpoints
  cluster_ip: string;
  external_ip: string | null;
  ports: string;                    // JSON array
  
  // Selector
  selector: string;                 // JSON object
  
  // Endpoints
  num_endpoints: number;
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// MULTIPLAYER SESSIONS
// ============================================================================
export interface MultiplayerSessionsTable {
  id: Generated<number>;
  
  cluster_id: string;
  
  // Users in session
  users: string;                    // JSON array of user objects
  
  // Session status
  active: boolean;
  
  created_at: string;
  ended_at: string | null;
}

// ============================================================================
// USER PRESENCE (Who's online)
// ============================================================================
export interface UserPresenceTable {
  id: Generated<number>;
  
  session_id: number;               // FK to multiplayer_sessions
  
  user_id: string;
  username: string;
  
  // Current activity
  current_action: string | null;    // "Editing pod-123"
  cursor_position: string | null;   // JSON {x, y}
  
  // Status
  status: 'active' | 'idle' | 'away';
  
  last_seen_at: string;
  joined_at: string;
}

// ============================================================================
// CHAOS EXPERIMENTS
// ============================================================================
export interface ChaosExperimentsTable {
  id: Generated<number>;
  
  cluster_id: string;
  
  name: string;
  description: string | null;
  
  // Experiment type
  type: 'pod_failure' | 'network_latency' | 'resource_exhaustion' | 
        'node_failure' | 'custom';
  
  // Configuration
  config: string;                   // JSON: {target, duration, etc.}
  
  // Impact
  affected_resources: string;       // JSON array of resource IDs
  
  // Status
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  
  // Results
  impact_metrics: string | null;    // JSON: metrics before/after
  
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

// ============================================================================
// METRICS (Time-series)
// ============================================================================
export interface MetricsTable {
  id: Generated<number>;
  
  resource_id: string;              // pod-123, node-456
  resource_type: string;            // "Pod", "Node", "Cluster"
  
  // Metric data
  metric_name: string;              // "cpu_usage", "memory_usage"
  value: number;
  unit: string;                     // "cores", "MB", "percent"
  
  timestamp: string;
}

// ============================================================================
// ALERTS
// ============================================================================
export interface AlertsTable {
  id: Generated<number>;
  
  cluster_id: string;
  
  // Alert info
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  
  // Source
  resource_id: string | null;
  resource_type: string | null;
  
  // Status
  status: 'active' | 'acknowledged' | 'resolved';
  
  triggered_at: string;
  resolved_at: string | null;
}

// ============================================================================
// DATABASE INTERFACE
// ============================================================================
export interface Database {
  events: EventsTable;
  snapshots: SnapshotsTable;
  cluster_view: ClusterViewTable;
  pod_status_view: PodStatusViewTable;
  deployment_view: DeploymentViewTable;
  service_view: ServiceViewTable;
  multiplayer_sessions: MultiplayerSessionsTable;
  user_presence: UserPresenceTable;
  chaos_experiments: ChaosExperimentsTable;
  metrics: MetricsTable;
  alerts: AlertsTable;
}

// Type helpers
export type Event = Selectable<EventsTable>;
export type NewEvent = Insertable<EventsTable>;

export type ClusterView = Selectable<ClusterViewTable>;
export type PodStatusView = Selectable<PodStatusViewTable>;
export type DeploymentView = Selectable<DeploymentViewTable>;
export type ServiceView = Selectable<ServiceViewTable>;

export type ChaosExperiment = Selectable<ChaosExperimentsTable>;
export type Metric = Selectable<MetricsTable>;
export type Alert = Selectable<AlertsTable>;
```

### Índices para Performance

```sql
-- events (most critical for event sourcing)
CREATE INDEX idx_events_aggregate ON events(aggregate_id, aggregate_type);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_created_at ON events(created_at DESC);
CREATE UNIQUE INDEX idx_events_version ON events(aggregate_id, version);

-- snapshots
CREATE INDEX idx_snapshots_aggregate ON snapshots(aggregate_id);
CREATE INDEX idx_snapshots_version ON snapshots(version DESC);

-- cluster_view
CREATE INDEX idx_cluster_view_status ON cluster_view(status);

-- pod_status_view
CREATE INDEX idx_pod_cluster ON pod_status_view(cluster_id);
CREATE INDEX idx_pod_phase ON pod_status_view(phase);
CREATE INDEX idx_pod_node ON pod_status_view(node_name);

-- deployment_view
CREATE INDEX idx_deployment_cluster ON deployment_view(cluster_id);
CREATE INDEX idx_deployment_status ON deployment_view(status);

-- service_view
CREATE INDEX idx_service_cluster ON service_view(cluster_id);

-- chaos_experiments
CREATE INDEX idx_chaos_cluster ON chaos_experiments(cluster_id);
CREATE INDEX idx_chaos_status ON chaos_experiments(status);

-- metrics (time-series optimization)
CREATE INDEX idx_metrics_resource ON metrics(resource_id, resource_type);
CREATE INDEX idx_metrics_timestamp ON metrics(timestamp DESC);

-- alerts
CREATE INDEX idx_alerts_cluster ON alerts(cluster_id);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_severity ON alerts(severity);
```

---

## 📦 Stack Tecnológico Exacto

### Frontend Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    
    "zustand": "^4.4.7",
    "zod": "^3.22.4",
    
    "@tanstack/react-query": "^5.14.0",
    "axios": "^1.6.2",
    
    "socket.io-client": "^4.6.0",
    
    "d3": "^7.8.5",
    "@types/d3": "^7.4.3",
    "reactflow": "^11.10.0",
    
    "xterm": "^5.3.0",
    "xterm-addon-fit": "^0.8.0",
    "@xterm/xterm": "^5.3.0",
    
    "framer-motion": "^10.16.0",
    
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    
    "monaco-editor": "^0.45.0",
    "@monaco-editor/react": "^4.6.0",
    
    "yaml": "^2.3.4",
    "js-yaml": "^4.1.0",
    "@types/js-yaml": "^4.0.9",
    
    "react-resizable-panels": "^1.0.0",
    "react-hot-toast": "^2.4.1",
    "react-use": "^17.4.0",
    
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8",
    
    "typescript": "^5.3.3",
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    
    "vitest": "^1.0.4",
    "@testing-library/react": "^14.1.2"
  }
}
```

### Backend Dependencies

```json
{
  "dependencies": {
    "express": "^5.0.0",
    "socket.io": "^4.6.0",
    
    "kysely": "^0.27.0",
    "better-sqlite3": "^9.2.0",
    
    "zod": "^3.22.4",
    
    "uuid": "^9.0.1",
    "@types/uuid": "^9.0.7",
    
    "yaml": "^2.3.4",
    
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/better-sqlite3": "^7.6.8",
    "@types/cors": "^2.8.17",
    "@types/compression": "^1.7.5",
    
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "nodemon": "^3.0.2",
    
    "vitest": "^1.0.4"
  }
}
```

---

## 🎨 Diseño Responsive - Breakpoints

```typescript
// Mismo que proyectos anteriores
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
  ultra: '1920px'
};
```

### Layout por Dispositivo

**Desktop (1024px+):**
- Topology (60%) | Terminal + Logs (40%)
- Split view resizable
- All panels visible

**Tablet (768px - 1024px):**
- Tabs: Topology / Terminal / Logs
- One main view at a time
- Collapsible sidebar

**Mobile (<768px):**
- List view (no graph)
- Terminal fullscreen mode
- Bottom navigation
- Swipe between views

---

## 🚀 Features por Fase de Desarrollo

### Fase 1: Core Infrastructure (Semanas 1-2)

**Backend:**
- ✅ Event Store setup (SQLite)
- ✅ CQRS basic implementation
- ✅ Pod aggregate + FSM
- ✅ Simple command handlers
- ✅ Projection: pod_status_view
- ✅ WebSocket setup

**Frontend:**
- ✅ Basic cluster view (list)
- ✅ Pod creation form
- ✅ WebSocket connection
- ✅ Real-time pod status updates

**Commands:**
- ✅ CreatePod
- ✅ DeletePod
- ✅ UpdatePodStatus

---

### Fase 2: Terminal + kubectl (Semanas 3-4)

**Backend:**
- ✅ kubectl command parser
- ✅ 10-15 kubectl commands:
  - `kubectl get pods`
  - `kubectl describe pod <name>`
  - `kubectl delete pod <name>`
  - `kubectl apply -f <yaml>`
  - `kubectl logs <pod>`

**Frontend:**
- ✅ Xterm.js integration
- ✅ Command autocomplete
- ✅ Command history
- ✅ Syntax highlighting

---

### Fase 3: Deployments + Services (Semana 5)

**Backend:**
- ✅ Deployment aggregate
- ✅ Service aggregate
- ✅ Reconciliation loop (basic)
- ✅ Rolling update strategy

**Frontend:**
- ✅ Deployment creator
- ✅ Service creator
- ✅ YAML editor (Monaco)
- ✅ Resource relationships visualization

**Commands:**
- ✅ CreateDeployment
- ✅ ScaleDeployment
- ✅ CreateService
- ✅ UpdateService

---

### Fase 4: Multiplayer + Chaos (Semana 6)

**Backend:**
- ✅ Room-based WebSockets
- ✅ Presence tracking
- ✅ Chaos engine
- ✅ 3-5 chaos experiments:
  - Pod failure
  - Network latency
  - CPU stress
  - Memory leak
  - Node failure

**Frontend:**
- ✅ User presence UI
- ✅ Collaborative cursors
- ✅ Chaos lab interface
- ✅ Impact analysis dashboard

---

## 🧮 Implementación Core: Event Sourcing

### Event Store

```typescript
// infrastructure/event-store/EventStore.ts
import { v4 as uuidv4 } from 'uuid';

export interface DomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  payload: any;
  metadata: {
    timestamp: string;
    userId?: string;
    causationId?: string;
    correlationId?: string;
  };
  version: number;
}

export class EventStore {
  constructor(private db: Database) {}

  async appendEvent(event: Omit<DomainEvent, 'eventId'>): Promise<DomainEvent> {
    const eventId = uuidv4();
    const fullEvent: DomainEvent = {
      ...event,
      eventId,
    };

    await this.db
      .insertInto('events')
      .values({
        event_id: eventId,
        event_type: event.eventType,
        aggregate_id: event.aggregateId,
        aggregate_type: event.aggregateType,
        payload: JSON.stringify(event.payload),
        metadata: JSON.stringify(event.metadata),
        version: event.version,
        created_at: new Date().toISOString(),
      })
      .execute();

    return fullEvent;
  }

  async getEvents(
    aggregateId: string,
    fromVersion = 0
  ): Promise<DomainEvent[]> {
    const rows = await this.db
      .selectFrom('events')
      .selectAll()
      .where('aggregate_id', '=', aggregateId)
      .where('version', '>=', fromVersion)
      .orderBy('version', 'asc')
      .execute();

    return rows.map((row) => ({
      eventId: row.event_id,
      eventType: row.event_type,
      aggregateId: row.aggregate_id,
      aggregateType: row.aggregate_type,
      payload: JSON.parse(row.payload),
      metadata: JSON.parse(row.metadata),
      version: row.version,
    }));
  }

  async getAllEvents(fromTimestamp?: string): Promise<DomainEvent[]> {
    let query = this.db.selectFrom('events').selectAll();

    if (fromTimestamp) {
      query = query.where('created_at', '>=', fromTimestamp);
    }

    const rows = await query.orderBy('created_at', 'asc').execute();

    return rows.map((row) => ({
      eventId: row.event_id,
      eventType: row.event_type,
      aggregateId: row.aggregate_id,
      aggregateType: row.aggregate_type,
      payload: JSON.parse(row.payload),
      metadata: JSON.parse(row.metadata),
      version: row.version,
    }));
  }

  // Snapshots for performance
  async saveSnapshot(
    aggregateId: string,
    aggregateType: string,
    state: any,
    version: number
  ): Promise<void> {
    await this.db
      .insertInto('snapshots')
      .values({
        aggregate_id: aggregateId,
        aggregate_type: aggregateType,
        state: JSON.stringify(state),
        version,
        created_at: new Date().toISOString(),
      })
      .execute();
  }

  async getLatestSnapshot(aggregateId: string): Promise<any | null> {
    const snapshot = await this.db
      .selectFrom('snapshots')
      .selectAll()
      .where('aggregate_id', '=', aggregateId)
      .orderBy('version', 'desc')
      .limit(1)
      .executeTakeFirst();

    if (!snapshot) return null;

    return {
      state: JSON.parse(snapshot.state),
      version: snapshot.version,
    };
  }
}
```

### Pod Aggregate (Domain Model)

```typescript
// domain/pod/Pod.ts
export type PodPhase = 'Pending' | 'Running' | 'Succeeded' | 'Failed' | 'Unknown';

export interface PodState {
  podId: string;
  clusterId: string;
  name: string;
  namespace: string;
  image: string;
  phase: PodPhase;
  nodeName: string | null;
  cpuRequest: number;
  memoryRequest: number;
  createdAt: string;
  startedAt: string | null;
  version: number;
}

export class Pod {
  private state: PodState;
  private uncommittedEvents: DomainEvent[] = [];

  constructor(state: PodState) {
    this.state = state;
  }

  // Factory method
  static create(
    podId: string,
    clusterId: string,
    name: string,
    namespace: string,
    image: string,
    cpuRequest: number,
    memoryRequest: number
  ): Pod {
    const pod = new Pod({
      podId,
      clusterId,
      name,
      namespace,
      image,
      phase: 'Pending',
      nodeName: null,
      cpuRequest,
      memoryRequest,
      createdAt: new Date().toISOString(),
      startedAt: null,
      version: 0,
    });

    pod.addEvent({
      eventType: 'PodCreated',
      payload: {
        podId,
        clusterId,
        name,
        namespace,
        image,
        cpuRequest,
        memoryRequest,
      },
    });

    return pod;
  }

  // Commands
  assignToNode(nodeName: string): void {
    if (this.state.phase !== 'Pending') {
      throw new Error('Pod must be in Pending state to assign to node');
    }

    this.state.nodeName = nodeName;
    this.state.phase = 'Running';
    this.state.startedAt = new Date().toISOString();

    this.addEvent({
      eventType: 'PodAssignedToNode',
      payload: {
        podId: this.state.podId,
        nodeName,
      },
    });

    this.addEvent({
      eventType: 'PodPhaseChanged',
      payload: {
        podId: this.state.podId,
        oldPhase: 'Pending',
        newPhase: 'Running',
      },
    });
  }

  markAsSucceeded(): void {
    if (this.state.phase !== 'Running') {
      throw new Error('Pod must be Running to mark as Succeeded');
    }

    this.state.phase = 'Succeeded';

    this.addEvent({
      eventType: 'PodSucceeded',
      payload: {
        podId: this.state.podId,
      },
    });
  }

  markAsFailed(reason: string): void {
    this.state.phase = 'Failed';

    this.addEvent({
      eventType: 'PodFailed',
      payload: {
        podId: this.state.podId,
        reason,
      },
    });
  }

  delete(): void {
    this.addEvent({
      eventType: 'PodDeleted',
      payload: {
        podId: this.state.podId,
      },
    });
  }

  // Event sourcing
  private addEvent(event: Omit<DomainEvent, 'eventId' | 'aggregateId' | 'aggregateType' | 'metadata' | 'version'>): void {
    this.state.version++;

    this.uncommittedEvents.push({
      eventId: '', // Will be set by EventStore
      eventType: event.eventType,
      aggregateId: this.state.podId,
      aggregateType: 'Pod',
      payload: event.payload,
      metadata: {
        timestamp: new Date().toISOString(),
      },
      version: this.state.version,
    });
  }

  getUncommittedEvents(): DomainEvent[] {
    return this.uncommittedEvents;
  }

  clearUncommittedEvents(): void {
    this.uncommittedEvents = [];
  }

  getState(): PodState {
    return { ...this.state };
  }

  // Rebuild from events
  static fromEvents(events: DomainEvent[]): Pod {
    if (events.length === 0) {
      throw new Error('No events to rebuild Pod');
    }

    const firstEvent = events[0];
    if (firstEvent.eventType !== 'PodCreated') {
      throw new Error('First event must be PodCreated');
    }

    const pod = new Pod({
      podId: firstEvent.payload.podId,
      clusterId: firstEvent.payload.clusterId,
      name: firstEvent.payload.name,
      namespace: firstEvent.payload.namespace,
      image: firstEvent.payload.image,
      phase: 'Pending',
      nodeName: null,
      cpuRequest: firstEvent.payload.cpuRequest,
      memoryRequest: firstEvent.payload.memoryRequest,
      createdAt: firstEvent.metadata.timestamp,
      startedAt: null,
      version: 0,
    });

    // Apply subsequent events
    for (let i = 1; i < events.length; i++) {
      pod.applyEvent(events[i]);
    }

    return pod;
  }

  private applyEvent(event: DomainEvent): void {
    switch (event.eventType) {
      case 'PodAssignedToNode':
        this.state.nodeName = event.payload.nodeName;
        break;

      case 'PodPhaseChanged':
        this.state.phase = event.payload.newPhase;
        if (event.payload.newPhase === 'Running') {
          this.state.startedAt = event.metadata.timestamp;
        }
        break;

      case 'PodSucceeded':
      case 'PodFailed':
        this.state.phase = event.eventType === 'PodSucceeded' ? 'Succeeded' : 'Failed';
        break;
    }

    this.state.version = event.version;
  }
}
```

### Scheduler Service

```typescript
// services/scheduler/Scheduler.ts
export interface Node {
  name: string;
  availableCpu: number;  // millicores
  availableMemory: number; // MB
}

export class Scheduler {
  schedule(pod: PodState, nodes: Node[]): string | null {
    // Filter nodes that have enough resources
    const suitableNodes = nodes.filter(
      (node) =>
        node.availableCpu >= pod.cpuRequest &&
        node.availableMemory >= pod.memoryRequest
    );

    if (suitableNodes.length === 0) {
      return null; // No suitable node
    }

    // Simple strategy: pick node with most available CPU
    suitableNodes.sort((a, b) => b.availableCpu - a.availableCpu);

    return suitableNodes[0].name;
  }
}
```

### kubectl Simulator

```typescript
// kubectl/CommandExecutor.ts
export class KubectlExecutor {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async execute(command: string): Promise<string> {
    const parts = command.trim().split(/\s+/);

    if (parts[0] !== 'kubectl') {
      return 'Error: Command must start with kubectl';
    }

    const subcommand = parts[1];

    switch (subcommand) {
      case 'get':
        return this.handleGet(parts.slice(2));

      case 'describe':
        return this.handleDescribe(parts.slice(2));

      case 'delete':
        return this.handleDelete(parts.slice(2));

      case 'apply':
        return this.handleApply(parts.slice(2));

      case 'logs':
        return this.handleLogs(parts.slice(2));

      default:
        return `Error: Unknown subcommand: ${subcommand}`;
    }
  }

  private async handleGet(args: string[]): Promise<string> {
    const resourceType = args[0];

    if (resourceType === 'pods') {
      const pods = await this.db
        .selectFrom('pod_status_view')
        .selectAll()
        .execute();

      if (pods.length === 0) {
        return 'No resources found';
      }

      // Format as table
      let output = 'NAME                STATUS    NODE\n';
      pods.forEach((pod) => {
        output += `${pod.name.padEnd(20)} ${pod.phase.padEnd(10)} ${pod.node_name || 'None'}\n`;
      });

      return output;
    }

    if (resourceType === 'deployments') {
      const deployments = await this.db
        .selectFrom('deployment_view')
        .selectAll()
        .execute();

      let output = 'NAME                READY   UP-TO-DATE   AVAILABLE\n';
      deployments.forEach((dep) => {
        output += `${dep.name.padEnd(20)} ${dep.ready_replicas}/${dep.replicas}    ${dep.replicas}            ${dep.available_replicas}\n`;
      });

      return output;
    }

    return `Error: Unknown resource type: ${resourceType}`;
  }

  private async handleDescribe(args: string[]): Promise<string> {
    const resourceType = args[0];
    const resourceName = args[1];

    if (resourceType === 'pod') {
      const pod = await this.db
        .selectFrom('pod_status_view')
        .selectAll()
        .where('name', '=', resourceName)
        .executeTakeFirst();

      if (!pod) {
        return `Error: Pod "${resourceName}" not found`;
      }

      return `
Name:         ${pod.name}
Namespace:    ${pod.namespace}
Status:       ${pod.phase}
IP:           10.0.0.${pod.id}
Node:         ${pod.node_name || 'None'}
Image:        ${pod.image}
CPU Request:  ${pod.cpu_request}m
Memory Request: ${pod.memory_request}Mi
Created:      ${pod.created_at}
      `.trim();
    }

    return `Error: Unknown resource type: ${resourceType}`;
  }

  private async handleDelete(args: string[]): Promise<string> {
    const resourceType = args[0];
    const resourceName = args[1];

    if (resourceType === 'pod') {
      // This would dispatch a DeletePod command
      return `pod "${resourceName}" deleted`;
    }

    return `Error: Unknown resource type: ${resourceType}`;
  }

  private async handleApply(args: string[]): Promise<string> {
    // Parse -f flag
    const yamlFile = args[args.indexOf('-f') + 1];

    // This would parse YAML and dispatch Create commands
    return `resource(s) created`;
  }

  private async handleLogs(args: string[]): Promise<string> {
    const podName = args[0];

    // Return simulated logs
    return `
[2025-01-29 10:00:00] Starting container...
[2025-01-29 10:00:01] Application started successfully
[2025-01-29 10:00:02] Listening on port 8080
    `.trim();
  }
}
```

---

## 🎨 Tema Visual - Estilo "DevOps"

```css
/* styles/devops-theme.css */

:root {
  /* DevOps Color Palette */
  --devops-primary: #00D9FF;       /* Cyan tech */
  --devops-secondary: #FF6B6B;     /* Coral red (alerts) */
  --devops-success: #51CF66;       /* Green (healthy) */
  --devops-warning: #FFD93D;       /* Yellow (pending) */
  --devops-error: #FF6B6B;         /* Red (failed) */
  
  /* Terminal colors */
  --terminal-bg: #1E1E1E;
  --terminal-fg: #CCCCCC;
  --terminal-cursor: #00D9FF;
  
  /* Node status colors */
  --node-running: #51CF66;
  --node-pending: #FFD93D;
  --node-failed: #FF6B6B;
  --node-unknown: #868E96;
  
  /* Backgrounds */
  --bg-primary: #0A1929;
  --bg-secondary: #132F4C;
  --bg-tertiary: #1A3E5C;
  
  /* Text */
  --text-primary: #E3F2FD;
  --text-secondary: #B0BEC5;
  --text-muted: #78909C;
  
  /* Borders */
  --border-color: #1A3E5C;
}

/* Terminal styling */
.terminal-container {
  background: var(--terminal-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0;
  font-family: 'JetBrains Mono', monospace;
}

/* Node visualization */
.node {
  fill: var(--bg-secondary);
  stroke: var(--devops-primary);
  stroke-width: 2;
  transition: all 0.3s;
}

.node.running {
  stroke: var(--node-running);
  filter: drop-shadow(0 0 8px var(--node-running));
}

.node.pending {
  stroke: var(--node-pending);
  animation: pulse 2s infinite;
}

.node.failed {
  stroke: var(--node-failed);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Connection lines */
.connection {
  stroke: var(--devops-primary);
  stroke-width: 2;
  opacity: 0.3;
  animation: flow 2s infinite;
}

@keyframes flow {
  0% {
    stroke-dashoffset: 20;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* Status badges */
.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.running {
  background: rgba(81, 207, 102, 0.2);
  color: var(--node-running);
  border: 1px solid var(--node-running);
}

.status-badge.pending {
  background: rgba(255, 217, 61, 0.2);
  color: var(--node-pending);
  border: 1px solid var(--node-pending);
}

.status-badge.failed {
  background: rgba(255, 107, 107, 0.2);
  color: var(--node-failed);
  border: 1px solid var(--node-failed);
}
```

---

## 📊 WebSocket Events

```typescript
// shared/types/websocket.ts

// Client → Server
export type ClientEvent =
  | { type: 'join_cluster'; clusterId: string; userId: string; username: string }
  | { type: 'leave_cluster'; clusterId: string }
  | { type: 'create_pod'; clusterId: string; podSpec: any }
  | { type: 'delete_pod'; clusterId: string; podId: string }
  | { type: 'cursor_move'; x: number; y: number };

// Server → Client
export type ServerEvent =
  | { type: 'cluster_state'; state: ClusterView }
  | { type: 'pod_created'; pod: PodStatusView }
  | { type: 'pod_updated'; pod: PodStatusView }
  | { type: 'pod_deleted'; podId: string }
  | { type: 'user_joined'; userId: string; username: string }
  | { type: 'user_left'; userId: string }
  | { type: 'user_cursor'; userId: string; x: number; y: number };
```

---

## 🧪 Testing Strategy

```typescript
// tests/event-sourcing.test.ts
describe('Event Sourcing', () => {
  it('should rebuild Pod from events', () => {
    const events: DomainEvent[] = [
      {
        eventId: '1',
        eventType: 'PodCreated',
        aggregateId: 'pod-123',
        aggregateType: 'Pod',
        payload: {
          podId: 'pod-123',
          clusterId: 'cluster-1',
          name: 'my-pod',
          namespace: 'default',
          image: 'nginx:latest',
          cpuRequest: 100,
          memoryRequest: 256,
        },
        metadata: { timestamp: '2025-01-29T10:00:00Z' },
        version: 1,
      },
      {
        eventId: '2',
        eventType: 'PodAssignedToNode',
        aggregateId: 'pod-123',
        aggregateType: 'Pod',
        payload: {
          podId: 'pod-123',
          nodeName: 'node-1',
        },
        metadata: { timestamp: '2025-01-29T10:00:01Z' },
        version: 2,
      },
    ];

    const pod = Pod.fromEvents(events);
    const state = pod.getState();

    expect(state.name).toBe('my-pod');
    expect(state.phase).toBe('Running');
    expect(state.nodeName).toBe('node-1');
    expect(state.version).toBe(2);
  });
});

// tests/scheduler.test.ts
describe('Scheduler', () => {
  it('should schedule pod to node with most CPU', () => {
    const scheduler = new Scheduler();

    const pod: PodState = {
      podId: 'pod-1',
      clusterId: 'cluster-1',
      name: 'test-pod',
      namespace: 'default',
      image: 'nginx',
      phase: 'Pending',
      nodeName: null,
      cpuRequest: 100,
      memoryRequest: 256,
      createdAt: '',
      startedAt: null,
      version: 1,
    };

    const nodes: Node[] = [
      { name: 'node-1', availableCpu: 500, availableMemory: 1024 },
      { name: 'node-2', availableCpu: 1000, availableMemory: 2048 },
      { name: 'node-3', availableCpu: 200, availableMemory: 512 },
    ];

    const selectedNode = scheduler.schedule(pod, nodes);

    expect(selectedNode).toBe('node-2'); // Most CPU available
  });
});
```

---

## 🎯 Métricas de Éxito

- [ ] Event Store funcional
- [ ] CQRS pattern implementado
- [ ] 3+ aggregates (Pod, Deployment, Service)
- [ ] 15+ kubectl commands
- [ ] WebSocket multiplayer (5-10 usuarios)
- [ ] D3.js cluster topology
- [ ] Xterm.js terminal
- [ ] Chaos engineering (5 tipos de fallos)
- [ ] Time-travel debugging (replay events)
- [ ] Responsive mobile/tablet/desktop
- [ ] Documentación completa
- [ ] Tests coverage >70%

---

## ✅ Checklist de Implementación

### Semanas 1-2: Event Sourcing Foundation
- [ ] SQLite event store schema
- [ ] EventStore class
- [ ] Pod aggregate
- [ ] Pod FSM
- [ ] Command handlers básicos
- [ ] pod_status_view projection

### Semanas 3-4: Terminal + kubectl
- [ ] Xterm.js setup
- [ ] KubectlExecutor
- [ ] 15 kubectl commands
- [ ] Command autocomplete
- [ ] Terminal UI

### Semana 5: Deployments + Services
- [ ] Deployment aggregate
- [ ] Service aggregate
- [ ] Reconciliation loop
- [ ] YAML editor (Monaco)
- [ ] Resource visualization

### Semana 6: Multiplayer + Chaos
- [ ] WebSocket rooms
- [ ] Presence tracking
- [ ] Chaos engine
- [ ] 5 chaos experiments
- [ ] Impact dashboard

---

**FIN DE ARQUITECTURA DEVOPS ARENA**
