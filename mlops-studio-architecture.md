# MLOps Studio - Arquitectura Técnica Completa

## 📋 Información General

**Proyecto:** Plataforma Completa de ML Lifecycle Management  
**Plataforma:** Mimo (React 18 + Node.js + Express 5 + SQLite)  
**Tiempo estimado:** 7 semanas (1 persona, medio tiempo)  
**Nivel de complejidad:** 🔥🔥🔥🔥 (Alta)

---

## 🎯 Objetivos del Proyecto

1. Pipeline completo de ML: Data → Train → Evaluate → Deploy
2. Model registry con versioning (semver)
3. AutoML con hyperparameter optimization
4. Model serving con REST API autogenerada
5. A/B testing de modelos en producción
6. Drift detection (data + concept drift)
7. Explainability (SHAP values)
8. Experiment tracking completo

---

## 🏗️ Arquitectura General

```
┌──────────────────────────────────────────────────────────────┐
│                     FRONTEND (React 18)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────┐ │
│  │ Data        │  │   Model     │  │   Deployment         │ │
│  │ Pipeline    │  │   Studio    │  │   Dashboard          │ │
│  └─────────────┘  └─────────────┘  └──────────────────────┘ │
│         │                │                    │              │
│         └────────────────┴────────────────────┘              │
│                          │                                   │
│                  ┌───────▼────────┐                          │
│                  │   API Routes   │                          │
│                  └───────┬────────┘                          │
└──────────────────────────┼───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                   BACKEND (Express 5)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐ │
│  │ ML Pipeline  │  │ Model Serving│  │ Monitoring         │ │
│  │ - Preprocess │  │ - Inference  │  │ - Drift Detection  │ │
│  │ - Training   │  │ - API Gen    │  │ - Performance      │ │
│  │ - AutoML     │  │ - A/B Test   │  │ - Alerts           │ │
│  └──────────────┘  └──────────────┘  └────────────────────┘ │
│           │                 │                   │            │
│           └─────────────────┴───────────────────┘            │
│                             │                                │
│                     ┌───────▼────────┐                       │
│                     │ SQLite Database│                       │
│                     │ /data/mlops.db │                       │
│                     └────────────────┘                       │
│                             │                                │
│                     ┌───────▼────────┐                       │
│                     │ File Storage   │                       │
│                     │ /data/models/  │                       │
│                     │ /data/datasets/│                       │
│                     └────────────────┘                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                  TENSORFLOW.JS (Browser)                     │
│  - Model training (GPU accelerated si disponible)           │
│  - Inference                                                 │
│  - Transfer learning                                         │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Carpetas Completa

```
mlops-studio/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── data-pipeline/
│   │   │   │   ├── DataUploader.tsx            # CSV/JSON upload
│   │   │   │   ├── DataPreview.tsx             # Table preview
│   │   │   │   ├── DataCleaner.tsx             # Missing values, outliers
│   │   │   │   ├── FeatureEngineer.tsx         # Create features
│   │   │   │   ├── DataSplitter.tsx            # Train/val/test split
│   │   │   │   └── DataStatistics.tsx          # Summary stats
│   │   │   │
│   │   │   ├── model-studio/
│   │   │   │   ├── ArchitectureDesigner.tsx    # Visual NN builder
│   │   │   │   ├── LayerPalette.tsx            # Available layers
│   │   │   │   ├── HyperparamTuner.tsx         # Grid/Random/Bayesian
│   │   │   │   ├── TrainingMonitor.tsx         # Real-time metrics
│   │   │   │   ├── ModelComparer.tsx           # Side-by-side comparison
│   │   │   │   └── TransferLearning.tsx        # Pre-trained models
│   │   │   │
│   │   │   ├── model-registry/
│   │   │   │   ├── ModelList.tsx               # All models
│   │   │   │   ├── ModelCard.tsx               # Model metadata
│   │   │   │   ├── VersionHistory.tsx          # Version tree
│   │   │   │   ├── ModelComparison.tsx         # Compare versions
│   │   │   │   └── StagePromotion.tsx          # Staging → Production
│   │   │   │
│   │   │   ├── deployment/
│   │   │   │   ├── EndpointGenerator.tsx       # Auto-create API
│   │   │   │   ├── InferencePlayground.tsx     # Test predictions
│   │   │   │   ├── ABTestingConfig.tsx         # Traffic split
│   │   │   │   └── DeploymentMonitor.tsx       # Live metrics
│   │   │   │
│   │   │   ├── explainability/
│   │   │   │   ├── SHAPVisualizer.tsx          # SHAP values
│   │   │   │   ├── FeatureImportance.tsx       # Bar chart
│   │   │   │   ├── ConfusionMatrix.tsx         # Heatmap
│   │   │   │   ├── ROCCurve.tsx                # ROC/AUC
│   │   │   │   └── PredictionExplainer.tsx     # Single prediction
│   │   │   │
│   │   │   ├── monitoring/
│   │   │   │   ├── DriftDashboard.tsx          # Data drift metrics
│   │   │   │   ├── PerformanceChart.tsx        # Accuracy over time
│   │   │   │   ├── LatencyChart.tsx            # Response time
│   │   │   │   └── AlertsList.tsx              # Active alerts
│   │   │   │
│   │   │   ├── automl/
│   │   │   │   ├── AutoMLWizard.tsx            # Step-by-step
│   │   │   │   ├── SearchSpaceConfig.tsx       # Hyperparameter ranges
│   │   │   │   ├── TrialProgress.tsx           # Current trials
│   │   │   │   └── BestModelCard.tsx           # Best found so far
│   │   │   │
│   │   │   └── shared/
│   │   │       ├── Layout.tsx
│   │   │       ├── Stepper.tsx                 # Wizard component
│   │   │       ├── MetricCard.tsx
│   │   │       └── CodeBlock.tsx               # Syntax highlighting
│   │   │
│   │   ├── lib/
│   │   │   ├── ml/
│   │   │   │   ├── preprocessing/
│   │   │   │   │   ├── scaler.ts               # StandardScaler, MinMaxScaler
│   │   │   │   │   ├── encoder.ts              # OneHotEncoder, LabelEncoder
│   │   │   │   │   ├── imputer.ts              # Missing value imputation
│   │   │   │   │   └── outliers.ts             # IQR, Z-score
│   │   │   │   │
│   │   │   │   ├── models/
│   │   │   │   │   ├── neural-network.ts       # Sequential models
│   │   │   │   │   ├── cnn.ts                  # Image models
│   │   │   │   │   ├── rnn.ts                  # Sequence models
│   │   │   │   │   ├── decision-tree.ts        # Basic tree
│   │   │   │   │   ├── random-forest.ts        # Ensemble
│   │   │   │   │   └── linear-models.ts        # Regression, Logistic
│   │   │   │   │
│   │   │   │   ├── evaluation/
│   │   │   │   │   ├── metrics.ts              # Accuracy, F1, etc.
│   │   │   │   │   ├── cross-validation.ts     # K-fold CV
│   │   │   │   │   └── confusion-matrix.ts     # CM calculation
│   │   │   │   │
│   │   │   │   ├── automl/
│   │   │   │   │   ├── grid-search.ts          # Grid search
│   │   │   │   │   ├── random-search.ts        # Random search
│   │   │   │   │   ├── bayesian-opt.ts         # Gaussian Processes
│   │   │   │   │   └── early-stopping.ts       # Stop bad trials
│   │   │   │   │
│   │   │   │   ├── explainability/
│   │   │   │   │   ├── shap.ts                 # SHAP implementation
│   │   │   │   │   ├── lime.ts                 # LIME local explanations
│   │   │   │   │   └── feature-importance.ts   # Permutation importance
│   │   │   │   │
│   │   │   │   └── drift/
│   │   │   │       ├── ks-test.ts              # Kolmogorov-Smirnov
│   │   │   │       ├── psi.ts                  # Population Stability Index
│   │   │   │       └── concept-drift.ts        # Performance degradation
│   │   │   │
│   │   │   ├── data/
│   │   │   │   ├── parser.ts                   # CSV, JSON parsing
│   │   │   │   ├── validator.ts                # Schema validation
│   │   │   │   ├── splitter.ts                 # Train/val/test split
│   │   │   │   └── statistics.ts               # Descriptive stats
│   │   │   │
│   │   │   ├── serving/
│   │   │   │   ├── inference-engine.ts         # Model loading + predict
│   │   │   │   ├── batch-predictor.ts          # Batch inference
│   │   │   │   └── ab-router.ts                # A/B testing logic
│   │   │   │
│   │   │   └── utils/
│   │   │       ├── tf-helpers.ts               # TensorFlow.js utils
│   │   │       ├── math-utils.ts
│   │   │       └── validators.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── dataset-store.ts                # Zustand: Dataset state
│   │   │   ├── experiment-store.ts             # Experiments
│   │   │   ├── model-store.ts                  # Models registry
│   │   │   ├── deployment-store.ts             # Deployments
│   │   │   └── ui-store.ts                     # UI state
│   │   │
│   │   ├── hooks/
│   │   │   ├── useMLPipeline.ts                # Main pipeline hook
│   │   │   ├── useTraining.ts                  # Training orchestration
│   │   │   ├── useAutoML.ts                    # AutoML hook
│   │   │   ├── useInference.ts                 # Inference hook
│   │   │   └── useDriftDetection.ts            # Monitoring hook
│   │   │
│   │   ├── workers/
│   │   │   ├── training.worker.ts              # Heavy training
│   │   │   ├── preprocessing.worker.ts         # Data processing
│   │   │   └── inference.worker.ts             # Batch predictions
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── mlops-theme.css
│   │   │   └── responsive.css
│   │   │
│   │   ├── types/
│   │   │   ├── dataset.types.ts
│   │   │   ├── model.types.ts
│   │   │   ├── experiment.types.ts
│   │   │   └── api.types.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── datasets.ts                     # CRUD datasets
│   │   │   ├── experiments.ts                  # CRUD experiments
│   │   │   ├── models.ts                       # Model registry
│   │   │   ├── deployments.ts                  # Deployment management
│   │   │   ├── inference.ts                    # Prediction endpoints
│   │   │   ├── monitoring.ts                   # Metrics + alerts
│   │   │   └── automl.ts                       # AutoML trials
│   │   │
│   │   ├── services/
│   │   │   ├── dataset-service.ts              # Dataset logic
│   │   │   ├── training-service.ts             # Training orchestration
│   │   │   ├── model-service.ts                # Model management
│   │   │   ├── deployment-service.ts           # Deployment logic
│   │   │   ├── inference-service.ts            # Inference routing
│   │   │   ├── monitoring-service.ts           # Drift detection
│   │   │   └── automl-service.ts               # AutoML orchestration
│   │   │
│   │   ├── ml-pipeline/
│   │   │   ├── data-processor.ts               # Preprocessing pipeline
│   │   │   ├── trainer.ts                      # Training loop
│   │   │   ├── evaluator.ts                    # Model evaluation
│   │   │   └── deployer.ts                     # Model deployment
│   │   │
│   │   ├── db/
│   │   │   ├── schema.ts                       # Kysely schema
│   │   │   ├── migrations/
│   │   │   │   ├── 001_initial.ts
│   │   │   │   ├── 002_deployments.ts
│   │   │   │   ├── 003_monitoring.ts
│   │   │   │   └── 004_automl.ts
│   │   │   ├── queries/
│   │   │   │   ├── datasets.queries.ts
│   │   │   │   ├── experiments.queries.ts
│   │   │   │   ├── models.queries.ts
│   │   │   │   └── monitoring.queries.ts
│   │   │   └── connection.ts
│   │   │
│   │   ├── storage/
│   │   │   ├── file-manager.ts                 # File uploads/downloads
│   │   │   ├── model-store.ts                  # Model serialization
│   │   │   └── dataset-store.ts                # Dataset storage
│   │   │
│   │   ├── middleware/
│   │   │   ├── error-handler.ts
│   │   │   ├── validation.ts
│   │   │   └── rate-limiter.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── version-utils.ts                # Semver helpers
│   │   │   └── metrics-utils.ts
│   │   │
│   │   └── server.ts
│   │
│   └── package.json
│
├── shared/
│   ├── types/
│   │   ├── dataset.ts
│   │   ├── model.ts
│   │   ├── experiment.ts
│   │   └── api.ts
│   │
│   └── constants/
│       ├── model-types.ts
│       └── metrics.ts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── ML_BASICS.md
│   ├── API.md
│   └── DEPLOYMENT.md
│
├── scripts/
│   ├── seed-datasets.ts
│   └── benchmark.ts
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄️ Schema SQLite Detallado

```typescript
// db/schema.ts
import { Generated, Insertable, Selectable, Updateable } from 'kysely';

// ============================================================================
// DATASETS TABLE
// ============================================================================
export interface DatasetsTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  
  // File info
  file_path: string;                // /data/datasets/dataset-123.csv
  file_size_bytes: number;
  file_format: 'csv' | 'json' | 'parquet';
  
  // Data info
  num_rows: number;
  num_columns: number;
  schema: string;                   // JSON: [{name, type, nullable}]
  
  // Statistics
  statistics: string;               // JSON: {mean, std, min, max, etc.}
  missing_values: string;           // JSON: {column: count}
  
  // Task type
  task_type: 'classification' | 'regression' | 'clustering' | 'timeseries';
  target_column: string | null;
  
  // Preprocessing
  preprocessing_steps: string;      // JSON array of transformations
  
  // Splits
  train_split: number;              // 0.0 - 1.0
  val_split: number;
  test_split: number;
  
  created_at: string;
  updated_at: string;
}

// ============================================================================
// EXPERIMENTS TABLE
// ============================================================================
export interface ExperimentsTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  
  // Dataset reference
  dataset_id: number;               // FK to datasets
  
  // Model architecture
  model_type: 'neural_network' | 'cnn' | 'rnn' | 'decision_tree' | 
              'random_forest' | 'linear_regression' | 'logistic_regression';
  architecture: string;             // JSON: layers config
  
  // Hyperparameters
  hyperparameters: string;          // JSON: {lr, epochs, batch_size, etc.}
  
  // Training metrics (time series)
  training_metrics: string;         // JSON: [{epoch, loss, accuracy}]
  validation_metrics: string;       // JSON: [{epoch, val_loss, val_accuracy}]
  
  // Final metrics
  test_metrics: string;             // JSON: {accuracy, f1, precision, recall}
  
  // Performance
  training_time_ms: number;
  inference_time_ms: number | null;
  
  // Status
  status: 'queued' | 'training' | 'completed' | 'failed' | 'cancelled';
  error_message: string | null;
  
  // AutoML
  is_automl: boolean;
  automl_trial_id: number | null;   // FK to automl_trials
  
  created_at: string;
  completed_at: string | null;
}

// ============================================================================
// MODELS TABLE (Registry)
// ============================================================================
export interface ModelsTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  
  // Source experiment
  experiment_id: number;            // FK to experiments
  
  // Versioning (semver)
  version: string;                  // "1.0.0", "1.1.0", "2.0.0-beta"
  parent_version_id: number | null; // FK to models (for lineage)
  
  // Model files
  model_path: string;               // /data/models/model-v1.0.0/
  weights_file: string;             // model.json
  metadata_file: string;            // metadata.json
  
  // Size
  size_bytes: number;
  num_parameters: number | null;
  
  // Format
  format: 'tfjs' | 'onnx' | 'json';
  framework: string;                // "TensorFlow.js 4.15.0"
  
  // Stage (MLOps lifecycle)
  stage: 'development' | 'staging' | 'production' | 'archived';
  
  // Deployment
  is_deployed: boolean;
  deployment_count: number;
  
  // Metadata
  tags: string;                     // JSON array
  author: string | null;
  
  created_at: string;
  promoted_at: string | null;
  archived_at: string | null;
}

// ============================================================================
// DEPLOYMENTS TABLE
// ============================================================================
export interface DeploymentsTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  
  // Model reference
  model_id: number;                 // FK to models
  
  // Endpoint
  endpoint_path: string;            // "/api/predict/sentiment-v1"
  
  // A/B Testing
  traffic_percentage: number;       // 0-100 (for canary/blue-green)
  ab_test_id: number | null;        // FK to ab_tests
  
  // Performance metrics
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  avg_latency_ms: number;
  p95_latency_ms: number;
  p99_latency_ms: number;
  
  // Resource usage
  avg_memory_mb: number | null;
  
  // Status
  status: 'active' | 'paused' | 'stopped';
  
  deployed_at: string;
  stopped_at: string | null;
}

// ============================================================================
// PREDICTIONS TABLE
// ============================================================================
export interface PredictionsTable {
  id: Generated<number>;
  deployment_id: number;            // FK to deployments
  
  // Input/Output
  input_data: string;               // JSON
  prediction: string;               // JSON (can be class, probability, etc.)
  confidence: number | null;        // 0-1
  
  // Performance
  latency_ms: number;
  
  // Feedback (optional)
  ground_truth: string | null;      // If available
  is_correct: boolean | null;
  
  created_at: string;
}

// ============================================================================
// DRIFT_DETECTIONS TABLE
// ============================================================================
export interface DriftDetectionsTable {
  id: Generated<number>;
  deployment_id: number;            // FK to deployments
  
  // Drift type
  drift_type: 'data_drift' | 'concept_drift' | 'prediction_drift';
  
  // Feature-specific (for data drift)
  feature_name: string | null;
  
  // Metrics
  drift_score: number;              // KS statistic, PSI, etc.
  threshold: number;
  is_drifted: boolean;
  
  // Statistical test
  test_method: 'ks_test' | 'psi' | 'chi_squared';
  p_value: number | null;
  
  // Alert
  alert_triggered: boolean;
  alert_message: string | null;
  
  detected_at: string;
}

// ============================================================================
// AUTOML_TRIALS TABLE
// ============================================================================
export interface AutoMLTrialsTable {
  id: Generated<number>;
  experiment_name: string;
  
  // Search configuration
  search_strategy: 'grid' | 'random' | 'bayesian';
  search_space: string;             // JSON: hyperparameter ranges
  
  // Trial info
  trial_number: number;
  hyperparameters: string;          // JSON: actual values for this trial
  
  // Results
  score: number;                    // Metric to optimize (e.g., accuracy)
  metrics: string;                  // JSON: all metrics
  
  // Status
  status: 'pending' | 'running' | 'completed' | 'failed';
  
  // Performance
  training_time_ms: number | null;
  
  created_at: string;
  completed_at: string | null;
}

// ============================================================================
// AB_TESTS TABLE
// ============================================================================
export interface ABTestsTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  
  // Models being tested
  model_a_id: number;               // FK to models
  model_b_id: number;               // FK to models
  
  // Traffic split
  traffic_split_percent: number;    // 50 = 50/50 split
  
  // Metrics
  model_a_requests: number;
  model_b_requests: number;
  model_a_avg_latency: number;
  model_b_avg_latency: number;
  model_a_accuracy: number | null;
  model_b_accuracy: number | null;
  
  // Winner
  winner_model_id: number | null;
  
  // Status
  status: 'running' | 'completed' | 'stopped';
  
  started_at: string;
  ended_at: string | null;
}

// ============================================================================
// FEATURE_IMPORTANCE TABLE
// ============================================================================
export interface FeatureImportanceTable {
  id: Generated<number>;
  model_id: number;                 // FK to models
  
  // Feature info
  feature_name: string;
  importance_score: number;         // 0-1 or absolute value
  importance_type: 'permutation' | 'shap' | 'built_in';
  
  // Ranking
  rank: number;
  
  calculated_at: string;
}

// ============================================================================
// DATABASE INTERFACE
// ============================================================================
export interface Database {
  datasets: DatasetsTable;
  experiments: ExperimentsTable;
  models: ModelsTable;
  deployments: DeploymentsTable;
  predictions: PredictionsTable;
  drift_detections: DriftDetectionsTable;
  automl_trials: AutoMLTrialsTable;
  ab_tests: ABTestsTable;
  feature_importance: FeatureImportanceTable;
}

// Type helpers
export type Dataset = Selectable<DatasetsTable>;
export type NewDataset = Insertable<DatasetsTable>;
export type DatasetUpdate = Updateable<DatasetsTable>;

export type Experiment = Selectable<ExperimentsTable>;
export type NewExperiment = Insertable<ExperimentsTable>;

export type Model = Selectable<ModelsTable>;
export type NewModel = Insertable<ModelsTable>;

export type Deployment = Selectable<DeploymentsTable>;
export type Prediction = Selectable<PredictionsTable>;
export type DriftDetection = Selectable<DriftDetectionsTable>;
export type AutoMLTrial = Selectable<AutoMLTrialsTable>;
```

### Índices para Performance

```sql
-- datasets
CREATE INDEX idx_datasets_task_type ON datasets(task_type);
CREATE INDEX idx_datasets_created_at ON datasets(created_at DESC);

-- experiments
CREATE INDEX idx_experiments_dataset_id ON experiments(dataset_id);
CREATE INDEX idx_experiments_status ON experiments(status);
CREATE INDEX idx_experiments_is_automl ON experiments(is_automl);
CREATE INDEX idx_experiments_created_at ON experiments(created_at DESC);

-- models
CREATE INDEX idx_models_version ON models(version);
CREATE INDEX idx_models_stage ON models(stage);
CREATE INDEX idx_models_is_deployed ON models(is_deployed);
CREATE UNIQUE INDEX idx_models_version_unique ON models(name, version);

-- deployments
CREATE INDEX idx_deployments_model_id ON deployments(model_id);
CREATE INDEX idx_deployments_status ON deployments(status);
CREATE INDEX idx_deployments_endpoint ON deployments(endpoint_path);

-- predictions
CREATE INDEX idx_predictions_deployment_id ON predictions(deployment_id);
CREATE INDEX idx_predictions_created_at ON predictions(created_at DESC);

-- drift_detections
CREATE INDEX idx_drift_deployment_id ON drift_detections(deployment_id);
CREATE INDEX idx_drift_is_drifted ON drift_detections(is_drifted);
CREATE INDEX idx_drift_detected_at ON drift_detections(detected_at DESC);

-- automl_trials
CREATE INDEX idx_automl_score ON automl_trials(score DESC);
CREATE INDEX idx_automl_status ON automl_trials(status);

-- feature_importance
CREATE INDEX idx_feature_model_id ON feature_importance(model_id);
CREATE INDEX idx_feature_rank ON feature_importance(rank);
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
    
    "@tensorflow/tfjs": "^4.15.0",
    "@tensorflow/tfjs-vis": "^1.5.1",
    
    "papaparse": "^5.4.1",
    "@types/papaparse": "^5.3.11",
    
    "reactflow": "^11.10.0",
    "framer-motion": "^10.16.0",
    
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "recharts": "^2.10.0",
    
    "d3": "^7.8.5",
    "@types/d3": "^7.4.3",
    
    "react-dropzone": "^14.2.3",
    "react-hot-toast": "^2.4.1",
    "react-use": "^17.4.0",
    
    "mathjs": "^12.2.0",
    
    "monaco-editor": "^0.45.0",
    "@monaco-editor/react": "^4.6.0",
    
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
    
    "kysely": "^0.27.0",
    "better-sqlite3": "^9.2.0",
    
    "zod": "^3.22.4",
    
    "multer": "^1.4.5",
    "@types/multer": "^1.4.11",
    
    "papaparse": "^5.4.1",
    
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    
    "dotenv": "^16.3.1",
    
    "mathjs": "^12.2.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/better-sqlite3": "^7.6.8",
    "@types/cors": "^2.8.17",
    "@types/compression": "^1.7.5",
    "@types/papaparse": "^5.3.11",
    
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
// Frontend sigue mismos breakpoints que QuantumCloud
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
- Sidebar con pipeline steps (250px)
- Main content area (flex-1)
- Right panel para metrics (350px)
- Layout: `grid-cols-[250px_1fr_350px]`

**Tablet (768px - 1024px):**
- Stepper horizontal en top
- Content fullwidth
- Metrics en collapsible panel
- Layout: `flex-col`

**Mobile (<768px):**
- Wizard step-by-step
- One section at a time
- Bottom navigation
- Fullscreen modals

---

## 🚀 Features por Fase de Desarrollo

### Fase 1: Data Pipeline (Semanas 1-2)

**Backend:**
- ✅ SQLite setup
- ✅ File upload endpoint
- ✅ CSV parser con Papa Parse
- ✅ Data statistics calculation
- ✅ Train/val/test split

**Frontend:**
- ✅ CSV upload component
- ✅ Data preview table
- ✅ Statistics dashboard
- ✅ Missing values visualization
- ✅ Split configuration UI

---

### Fase 2: Model Training (Semanas 3-4)

**Backend:**
- ✅ Experiment CRUD
- ✅ Model storage

**Frontend:**
- ✅ Architecture designer (drag & drop layers)
- ✅ Training monitor (real-time charts)
- ✅ TensorFlow.js integration
- ✅ 3 model types: NN, Decision Tree, Linear
- ✅ Hyperparameter form

**Models:**
- ✅ Neural Network (Sequential)
- ✅ Linear Regression
- ✅ Logistic Regression

---

### Fase 3: Model Registry (Semana 5)

**Backend:**
- ✅ Model versioning (semver)
- ✅ Model promotion (dev → staging → prod)
- ✅ Model comparison API

**Frontend:**
- ✅ Model list with versions
- ✅ Model card component
- ✅ Version history timeline
- ✅ Model comparison table

---

### Fase 4: Deployment & Serving (Semanas 6-7)

**Backend:**
- ✅ REST API autogenerada por modelo
- ✅ Inference endpoint
- ✅ A/B testing router
- ✅ Predictions logging

**Frontend:**
- ✅ Deployment wizard
- ✅ Inference playground
- ✅ A/B test configuration
- ✅ Live metrics dashboard

---

### Fase 5: AutoML & Explainability (Bonus - Semana 8+)

**Backend:**
- ✅ Grid search implementation
- ✅ SHAP calculation (basic)

**Frontend:**
- ✅ AutoML wizard
- ✅ Trial progress visualization
- ✅ SHAP visualizer
- ✅ Feature importance chart

---

## 🧮 Implementación Core: ML Pipeline

### Preprocessing - StandardScaler

```typescript
// lib/ml/preprocessing/scaler.ts
export class StandardScaler {
  private mean: number[] = [];
  private std: number[] = [];
  private fitted = false;

  fit(data: number[][]): void {
    const numFeatures = data[0].length;
    const numSamples = data.length;

    // Calculate mean
    this.mean = new Array(numFeatures).fill(0);
    for (let i = 0; i < numSamples; i++) {
      for (let j = 0; j < numFeatures; j++) {
        this.mean[j] += data[i][j];
      }
    }
    this.mean = this.mean.map(m => m / numSamples);

    // Calculate std
    this.std = new Array(numFeatures).fill(0);
    for (let i = 0; i < numSamples; i++) {
      for (let j = 0; j < numFeatures; j++) {
        this.std[j] += Math.pow(data[i][j] - this.mean[j], 2);
      }
    }
    this.std = this.std.map(s => Math.sqrt(s / numSamples));

    this.fitted = true;
  }

  transform(data: number[][]): number[][] {
    if (!this.fitted) {
      throw new Error('Scaler not fitted. Call fit() first.');
    }

    return data.map(row =>
      row.map((val, j) => (val - this.mean[j]) / (this.std[j] || 1))
    );
  }

  fitTransform(data: number[][]): number[][] {
    this.fit(data);
    return this.transform(data);
  }

  inverseTransform(data: number[][]): number[][] {
    if (!this.fitted) {
      throw new Error('Scaler not fitted.');
    }

    return data.map(row =>
      row.map((val, j) => val * (this.std[j] || 1) + this.mean[j])
    );
  }
}
```

### Model Training con TensorFlow.js

```typescript
// lib/ml/models/neural-network.ts
import * as tf from '@tensorflow/tfjs';

export interface NNConfig {
  layers: LayerConfig[];
  optimizer: 'adam' | 'sgd' | 'rmsprop';
  learningRate: number;
  loss: 'meanSquaredError' | 'categoricalCrossentropy';
  metrics: string[];
}

export interface LayerConfig {
  type: 'dense' | 'dropout' | 'batchNormalization';
  units?: number;
  activation?: 'relu' | 'sigmoid' | 'tanh' | 'softmax';
  rate?: number; // for dropout
}

export class NeuralNetwork {
  private model: tf.Sequential | null = null;
  private config: NNConfig;

  constructor(config: NNConfig) {
    this.config = config;
  }

  build(inputShape: number): void {
    this.model = tf.sequential();

    // Add layers
    this.config.layers.forEach((layerConfig, index) => {
      if (layerConfig.type === 'dense') {
        const layerOptions: tf.LayerArgs = {
          units: layerConfig.units!,
          activation: layerConfig.activation,
        };

        // First layer needs input shape
        if (index === 0) {
          layerOptions.inputShape = [inputShape];
        }

        this.model!.add(tf.layers.dense(layerOptions));
      } else if (layerConfig.type === 'dropout') {
        this.model!.add(tf.layers.dropout({ rate: layerConfig.rate! }));
      } else if (layerConfig.type === 'batchNormalization') {
        this.model!.add(tf.layers.batchNormalization());
      }
    });

    // Compile model
    this.model.compile({
      optimizer: tf.train.adam(this.config.learningRate),
      loss: this.config.loss,
      metrics: this.config.metrics,
    });
  }

  async train(
    X: number[][],
    y: number[][],
    config: {
      epochs: number;
      batchSize: number;
      validationSplit: number;
      onEpochEnd?: (epoch: number, logs: tf.Logs) => void;
    }
  ): Promise<tf.History> {
    if (!this.model) {
      throw new Error('Model not built. Call build() first.');
    }

    const xs = tf.tensor2d(X);
    const ys = tf.tensor2d(y);

    const history = await this.model.fit(xs, ys, {
      epochs: config.epochs,
      batchSize: config.batchSize,
      validationSplit: config.validationSplit,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (config.onEpochEnd) {
            config.onEpochEnd(epoch, logs!);
          }
        },
      },
    });

    xs.dispose();
    ys.dispose();

    return history;
  }

  predict(X: number[][]): number[][] {
    if (!this.model) {
      throw new Error('Model not trained.');
    }

    const xs = tf.tensor2d(X);
    const predictions = this.model.predict(xs) as tf.Tensor;
    const result = predictions.arraySync() as number[][];

    xs.dispose();
    predictions.dispose();

    return result;
  }

  async save(path: string): Promise<void> {
    if (!this.model) {
      throw new Error('Model not trained.');
    }

    await this.model.save(`localstorage://${path}`);
  }

  async load(path: string): Promise<void> {
    this.model = (await tf.loadLayersModel(
      `localstorage://${path}`
    )) as tf.Sequential;
  }

  getSummary(): string {
    if (!this.model) {
      return 'Model not built.';
    }

    const lines: string[] = [];
    this.model.layers.forEach((layer) => {
      lines.push(`${layer.name}: ${layer.outputShape}`);
    });

    return lines.join('\n');
  }

  dispose(): void {
    if (this.model) {
      this.model.dispose();
    }
  }
}
```

### AutoML - Grid Search

```typescript
// lib/ml/automl/grid-search.ts
export interface HyperparameterSpace {
  [key: string]: any[];
}

export interface Trial {
  id: number;
  hyperparameters: Record<string, any>;
  score: number;
  metrics: Record<string, number>;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export class GridSearch {
  private searchSpace: HyperparameterSpace;
  private trials: Trial[] = [];
  private bestTrial: Trial | null = null;

  constructor(searchSpace: HyperparameterSpace) {
    this.searchSpace = searchSpace;
    this.generateTrials();
  }

  private generateTrials(): void {
    const keys = Object.keys(this.searchSpace);
    const combinations = this.cartesianProduct(
      keys.map((k) => this.searchSpace[k])
    );

    this.trials = combinations.map((combo, index) => ({
      id: index,
      hyperparameters: Object.fromEntries(
        keys.map((key, i) => [key, combo[i]])
      ),
      score: 0,
      metrics: {},
      status: 'pending',
    }));
  }

  private cartesianProduct(arrays: any[][]): any[][] {
    return arrays.reduce(
      (acc, array) =>
        acc.flatMap((x) => array.map((y) => [...x, y])),
      [[]] as any[][]
    );
  }

  async run(
    trainFunc: (
      hyperparameters: Record<string, any>
    ) => Promise<{ score: number; metrics: Record<string, number> }>,
    onTrialComplete?: (trial: Trial) => void
  ): Promise<Trial> {
    for (const trial of this.trials) {
      trial.status = 'running';

      try {
        const result = await trainFunc(trial.hyperparameters);
        trial.score = result.score;
        trial.metrics = result.metrics;
        trial.status = 'completed';

        if (!this.bestTrial || trial.score > this.bestTrial.score) {
          this.bestTrial = trial;
        }

        if (onTrialComplete) {
          onTrialComplete(trial);
        }
      } catch (error) {
        trial.status = 'failed';
        console.error(`Trial ${trial.id} failed:`, error);
      }
    }

    return this.bestTrial!;
  }

  getTrials(): Trial[] {
    return this.trials;
  }

  getBestTrial(): Trial | null {
    return this.bestTrial;
  }
}
```

### SHAP Values (Simplified)

```typescript
// lib/ml/explainability/shap.ts
export class SHAPExplainer {
  private model: (input: number[]) => number;
  private backgroundData: number[][];

  constructor(
    model: (input: number[]) => number,
    backgroundData: number[][]
  ) {
    this.model = model;
    this.backgroundData = backgroundData;
  }

  explain(instance: number[], numSamples = 100): number[] {
    const numFeatures = instance.length;
    const shapValues = new Array(numFeatures).fill(0);

    // Calculate base value (average prediction on background)
    const baseValue =
      this.backgroundData.reduce(
        (sum, bg) => sum + this.model(bg),
        0
      ) / this.backgroundData.length;

    // For each feature
    for (let i = 0; i < numFeatures; i++) {
      let marginalContribution = 0;

      // Sample from background
      for (let s = 0; s < numSamples; s++) {
        const background =
          this.backgroundData[
            Math.floor(Math.random() * this.backgroundData.length)
          ];

        // With feature
        const withFeature = [...background];
        withFeature[i] = instance[i];
        const predWith = this.model(withFeature);

        // Without feature (background value)
        const predWithout = this.model(background);

        marginalContribution += predWith - predWithout;
      }

      shapValues[i] = marginalContribution / numSamples;
    }

    return shapValues;
  }
}
```

---

## 📊 API Routes

```typescript
// routes/datasets.ts

// POST /api/datasets/upload
interface UploadDatasetBody {
  file: File; // multipart/form-data
  name: string;
  task_type: 'classification' | 'regression';
  target_column?: string;
}

// GET /api/datasets/:id
// GET /api/datasets/:id/statistics
// GET /api/datasets/:id/preview?limit=100

// routes/experiments.ts

// POST /api/experiments
interface CreateExperimentBody {
  name: string;
  dataset_id: number;
  model_type: string;
  architecture: LayerConfig[];
  hyperparameters: Record<string, any>;
}

// GET /api/experiments/:id
// GET /api/experiments/:id/metrics (real-time training)
// POST /api/experiments/:id/stop

// routes/models.ts

// POST /api/models (create from experiment)
interface CreateModelBody {
  experiment_id: number;
  version: string; // semver
  name: string;
}

// GET /api/models
// GET /api/models/:id
// PATCH /api/models/:id/promote (dev → staging → prod)
// POST /api/models/:id/compare?with=model_id_2

// routes/deployments.ts

// POST /api/deployments
interface CreateDeploymentBody {
  model_id: number;
  name: string;
  traffic_percentage: number;
}

// GET /api/deployments/:id/metrics
// POST /api/predict/:endpoint_path
// GET /api/deployments/:id/drift

// routes/automl.ts

// POST /api/automl/start
interface StartAutoMLBody {
  dataset_id: number;
  search_space: HyperparameterSpace;
  strategy: 'grid' | 'random';
  max_trials?: number;
}

// GET /api/automl/:id/trials
// GET /api/automl/:id/best
```

---

## 🎨 Tema Visual - Estilo "MLOps"

```css
/* styles/mlops-theme.css */

:root {
  /* MLOps Color Palette */
  --ml-primary: #6366F1;       /* Indigo */
  --ml-secondary: #8B5CF6;     /* Purple */
  --ml-success: #10B981;       /* Green */
  --ml-warning: #F59E0B;       /* Amber */
  --ml-error: #EF4444;         /* Red */
  --ml-info: #3B82F6;          /* Blue */
  
  /* Backgrounds */
  --bg-primary: #0F172A;       /* Slate 900 */
  --bg-secondary: #1E293B;     /* Slate 800 */
  --bg-tertiary: #334155;      /* Slate 700 */
  
  /* Text */
  --text-primary: #F1F5F9;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  
  /* Borders */
  --border-color: #334155;
  
  /* Data viz colors */
  --viz-1: #6366F1;
  --viz-2: #8B5CF6;
  --viz-3: #EC4899;
  --viz-4: #F59E0B;
  --viz-5: #10B981;
}

/* Gradient backgrounds */
.gradient-primary {
  background: linear-gradient(135deg, var(--ml-primary), var(--ml-secondary));
}

/* Metric cards */
.metric-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
}

/* Progress bars */
.progress-bar {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--ml-primary), var(--ml-secondary));
  transition: width 0.3s ease;
}

/* Code blocks */
.code-block {
  background: #1E1E1E;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  overflow-x: auto;
}

/* Typography */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  color: var(--text-primary);
}

code {
  font-family: 'JetBrains Mono', monospace;
}
```

---

## 🧪 Testing Strategy

```typescript
// tests/preprocessing.test.ts
describe('StandardScaler', () => {
  it('should scale data correctly', () => {
    const scaler = new StandardScaler();
    const data = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    const scaled = scaler.fitTransform(data);

    // Mean should be ~0, std should be ~1
    const mean0 = scaled.reduce((sum, row) => sum + row[0], 0) / 3;
    expect(Math.abs(mean0)).toBeLessThan(0.001);
  });
});

// tests/neural-network.test.ts
describe('NeuralNetwork', () => {
  it('should train on XOR problem', async () => {
    const nn = new NeuralNetwork({
      layers: [
        { type: 'dense', units: 4, activation: 'relu' },
        { type: 'dense', units: 1, activation: 'sigmoid' },
      ],
      optimizer: 'adam',
      learningRate: 0.1,
      loss: 'meanSquaredError',
      metrics: ['accuracy'],
    });

    nn.build(2);

    const X = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    const y = [[0], [1], [1], [0]];

    await nn.train(X, y, {
      epochs: 1000,
      batchSize: 4,
      validationSplit: 0,
    });

    const predictions = nn.predict(X);

    // Should learn XOR
    expect(predictions[0][0]).toBeLessThan(0.1);    // 0 XOR 0 = 0
    expect(predictions[1][0]).toBeGreaterThan(0.9); // 0 XOR 1 = 1
    expect(predictions[2][0]).toBeGreaterThan(0.9); // 1 XOR 0 = 1
    expect(predictions[3][0]).toBeLessThan(0.1);    // 1 XOR 1 = 0
  });
});
```

---

## 🎯 Métricas de Éxito

- [ ] 8+ tipos de modelos ML
- [ ] Dataset upload hasta 100K rows
- [ ] AutoML con 3 estrategias (grid, random, bayesian)
- [ ] Model versioning con semver
- [ ] A/B testing funcional
- [ ] Drift detection (KS test + PSI)
- [ ] SHAP explainability
- [ ] REST API autogenerada por modelo
- [ ] <500ms inference time
- [ ] Responsive mobile/tablet/desktop
- [ ] Documentación completa
- [ ] Tests coverage >70%

---

## 📖 Datasets Ejemplo para Testing

```typescript
// scripts/seed-datasets.ts

// 1. Iris Dataset (Classification)
const iris = {
  features: ['sepal_length', 'sepal_width', 'petal_length', 'petal_width'],
  target: 'species', // setosa, versicolor, virginica
  rows: 150,
};

// 2. Boston Housing (Regression)
const bostonHousing = {
  features: ['CRIM', 'ZN', 'INDUS', 'NOX', 'RM', 'AGE', 'DIS', 'RAD', 'TAX', 'PTRATIO', 'B', 'LSTAT'],
  target: 'MEDV', // Median value
  rows: 506,
};

// 3. MNIST Subset (Image Classification)
const mnist = {
  features: ['pixel_1', 'pixel_2', ..., 'pixel_784'], // 28x28 = 784
  target: 'digit', // 0-9
  rows: 1000, // Subset
};
```

---

## ✅ Checklist de Implementación

### Semanas 1-2: Data Pipeline
- [ ] SQLite setup + migrations
- [ ] CSV upload endpoint
- [ ] Papa Parse integration
- [ ] Data statistics calculation
- [ ] Data preview UI
- [ ] Train/val/test split

### Semanas 3-4: Model Training
- [ ] TensorFlow.js setup
- [ ] NeuralNetwork class
- [ ] LinearRegression class
- [ ] Architecture designer UI
- [ ] Training monitor (real-time)
- [ ] Hyperparameter form

### Semana 5: Model Registry
- [ ] Model versioning (semver)
- [ ] Model CRUD
- [ ] Model promotion workflow
- [ ] Version history UI
- [ ] Model comparison

### Semanas 6-7: Deployment
- [ ] Inference endpoint
- [ ] REST API generator
- [ ] A/B testing router
- [ ] Deployment dashboard
- [ ] Predictions logging
- [ ] Drift detection (KS test)

### Semana 8+ (Bonus): AutoML & Explainability
- [ ] Grid search
- [ ] Random search
- [ ] AutoML wizard UI
- [ ] SHAP implementation
- [ ] Feature importance viz

---

**FIN DE ARQUITECTURA MLOPS STUDIO**
