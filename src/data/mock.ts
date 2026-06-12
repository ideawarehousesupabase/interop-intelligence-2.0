export const integrations = [
  {
    id: "int-001",
    name: "Epic EHR",
    source: "Epic EHR",
    destination: "NHS FHIR API",
    status: "Ongoing",
    lastSync: "2 min ago",
    health: 98,
    updated: "2026-05-30",
  },
  {
    id: "int-002",
    name: "Cerner Lab Results",
    source: "Cerner Lab",
    destination: "FHIR Observation",
    status: "Ongoing",
    lastSync: "12 min ago",
    health: 76,
    updated: "2026-05-30",
  },
  {
    id: "int-003",
    name: "Radiology Imaging Feed",
    source: "PACS",
    destination: "FHIR ImagingStudy",
    status: "Completed",
    lastSync: "1 min ago",
    health: 99,
    updated: "2026-05-30",
  },
  {
    id: "int-004",
    name: "Pathology HL7 v2 Pipeline",
    source: "Sunquest",
    destination: "FHIR DiagnosticReport",
    status: "Ongoing",
    lastSync: "1 hr ago",
    health: 42,
    updated: "2026-05-29",
  },
  {
    id: "int-005",
    name: "Pharmacy Orders",
    source: "Meditech",
    destination: "FHIR MedicationRequest",
    status: "Completed",
    lastSync: "5 min ago",
    health: 95,
    updated: "2026-05-30",
  },
  {
    id: "int-006",
    name: "NHS Spine Connector",
    source: "Internal",
    destination: "NHS Spine",
    status: "Completed",
    lastSync: "3 min ago",
    health: 97,
    updated: "2026-05-30",
  },
];

export const alerts = [
  {
    id: "a1",
    type: "Validation",
    severity: "high",
    message: "Missing patient DOB in 14 HL7 messages",
    time: "5 min ago",
  },
  {
    id: "a2",
    type: "Compliance",
    severity: "medium",
    message: "DCB0129 audit document expires in 12 days",
    time: "2 hr ago",
  },
  {
    id: "a3",
    type: "Mapping",
    severity: "high",
    message: "PID-3 to Patient.identifier mapping failed (Cerner Lab)",
    time: "18 min ago",
  },
  {
    id: "a4",
    type: "System",
    severity: "low",
    message: "Transformation latency above 200ms threshold",
    time: "1 hr ago",
  },
  {
    id: "a5",
    type: "Validation",
    severity: "medium",
    message: "Unsupported SNOMED CT code in 3 records",
    time: "30 min ago",
  },
];

export const complianceTrend = [
  { month: "Dec", score: 78 },
  { month: "Jan", score: 81 },
  { month: "Feb", score: 84 },
  { month: "Mar", score: 87 },
  { month: "Apr", score: 91 },
  { month: "May", score: 94 },
];

export const transformationSuccess = [
  { day: "Mon", success: 1240, failed: 32 },
  { day: "Tue", success: 1380, failed: 28 },
  { day: "Wed", success: 1410, failed: 51 },
  { day: "Thu", success: 1290, failed: 19 },
  { day: "Fri", success: 1520, failed: 24 },
  { day: "Sat", success: 980, failed: 12 },
  { day: "Sun", success: 870, failed: 8 },
];

export const readinessScoring = [
  { category: "Schema", score: 96 },
  { category: "Terminology", score: 88 },
  { category: "Completeness", score: 92 },
  { category: "NHS", score: 84 },
  { category: "Security", score: 97 },
];

export const transformationLogs = [
  { id: "log1", time: "10:42:18", level: "INFO", message: "HL7 ADT^A01 received from Epic EHR" },
  { id: "log2", time: "10:42:18", level: "INFO", message: "Parsed 12 segments, 47 fields" },
  {
    id: "log3",
    time: "10:42:19",
    level: "INFO",
    message: "Mapped to FHIR Patient resource (id: pat-9821)",
  },
  {
    id: "log4",
    time: "10:42:19",
    level: "WARN",
    message: "Field PID-13 (phone) format normalized",
  },
  {
    id: "log5",
    time: "10:42:19",
    level: "INFO",
    message: "Validation passed against UK Core profile",
  },
  { id: "log6", time: "10:42:20", level: "INFO", message: "Pushed to NHS FHIR API — 201 Created" },
];

export const auditLogs = [
  {
    id: "au1",
    user: "dr.smith@nhs.uk",
    action: "Viewed integration",
    resource: "int-001",
    time: "2026-05-30 10:42",
  },
  {
    id: "au2",
    user: "admin@trust.nhs.uk",
    action: "Updated mapping",
    resource: "int-002",
    time: "2026-05-30 09:18",
  },
  {
    id: "au3",
    user: "data.eng@trust.nhs.uk",
    action: "Exported audit report",
    resource: "DCB0129",
    time: "2026-05-29 16:05",
  },
  {
    id: "au4",
    user: "compliance@nhs.uk",
    action: "Approved release",
    resource: "v2.4.1",
    time: "2026-05-29 14:30",
  },
  {
    id: "au5",
    user: "dr.smith@nhs.uk",
    action: "Reviewed alert",
    resource: "a3",
    time: "2026-05-29 11:12",
  },
];

export const complianceReports = [
  {
    id: "r1",
    name: "DCB0129 Clinical Risk Assessment Q2 2026",
    date: "2026-05-15",
    status: "Approved",
  },
  { id: "r2", name: "DTAC Compliance Statement", date: "2026-05-10", status: "Approved" },
  { id: "r3", name: "Security Penetration Test Report", date: "2026-04-28", status: "Approved" },
  { id: "r4", name: "Data Protection Impact Assessment", date: "2026-04-12", status: "In Review" },
];

export const latencyData = [
  { time: "00:00", ms: 142 },
  { time: "04:00", ms: 138 },
  { time: "08:00", ms: 168 },
  { time: "12:00", ms: 215 },
  { time: "16:00", ms: 198 },
  { time: "20:00", ms: 156 },
];

export const sampleHL7 = `MSH|^~\\&|EPIC|TRUST|FHIRGW|NHS|202605301042||ADT^A01|MSG00001|P|2.5
PID|1||MRN12345^^^TRUST^MR||Doe^John^A||19780412|M|||221B Baker St^^London^^NW1 6XE^GBR||+44 20 7946 0958|||S||ACC998877
PV1|1|I|WARD3^201^A|||||REF^Smith^Jane^^^Dr|||||||||||V|||||||||||||||||||||||||202605301030
DG1|1||I21.9^Acute MI^ICD10||202605301030|A`;

export const sampleFHIR = {
  resourceType: "Patient",
  id: "pat-9821",
  identifier: [{ system: "https://trust.nhs.uk/mrn", value: "MRN12345" }],
  name: [{ family: "Doe", given: ["John", "A"] }],
  gender: "male",
  birthDate: "1978-04-12",
  address: [{ line: ["221B Baker St"], city: "London", postalCode: "NW1 6XE", country: "GBR" }],
  telecom: [{ system: "phone", value: "+44 20 7946 0958" }],
};

export const reasoningSteps = [
  {
    step: 1,
    title: "MSH segment parsed",
    detail:
      "Message type ADT^A01 detected, source EPIC, destination FHIRGW. Routing rules matched.",
  },
  {
    step: 2,
    title: "PID segment extracted",
    detail: "Patient identifier MRN12345 detected with assigning authority TRUST.",
  },
  {
    step: 3,
    title: "Name normalization",
    detail: "HL7 XPN component split into family='Doe' and given=['John','A'] per FHIR HumanName.",
  },
  {
    step: 4,
    title: "Gender normalized",
    detail: "HL7 'M' mapped to FHIR administrative-gender code 'male'.",
  },
  {
    step: 5,
    title: "Address mapping",
    detail: "XAD components mapped to FHIR Address; country normalized to ISO 3166 (GBR).",
  },
  {
    step: 6,
    title: "UK Core validation",
    detail: "Profile validation passed: required elements present, terminology bindings satisfied.",
  },
  {
    step: 7,
    title: "Push to NHS FHIR API",
    detail: "POST /Patient — 201 Created. Resource id pat-9821 issued.",
  },
];

export const readinessChecklist = [
  {
    name: "Schema Validity",
    passed: true,
    detail: "All FHIR resources validate against R4 schema",
  },
  { name: "Terminology Compliance", passed: true, detail: "SNOMED CT, LOINC, dm+d codes verified" },
  { name: "Data Completeness", passed: false, detail: "3% of records missing required fields" },
  { name: "NHS Readiness", passed: true, detail: "UK Core profile conformance achieved" },
  {
    name: "Security Posture",
    passed: true,
    detail: "TLS 1.3, OAuth scopes, audit logging enabled",
  },
  { name: "Performance SLA", passed: false, detail: "P95 latency above 200ms target" },
];

export const readinessIssues = [
  { id: "i1", severity: "high", title: "Missing patient DOB", count: 14, resource: "Patient" },
  {
    id: "i2",
    severity: "medium",
    title: "Invalid terminology code",
    count: 3,
    resource: "Condition",
  },
  {
    id: "i3",
    severity: "low",
    title: "Unsupported mapping (PV1-39)",
    count: 7,
    resource: "Encounter",
  },
];

function nodeStyle(color: string) {
  return {
    background: color,
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: 12,
    borderRadius: 10,
    fontWeight: 600,
    fontSize: 13,
    minWidth: 140,
    textAlign: "center" as const,
  };
}

const uniqueSources = Array.from(new Set(integrations.map((i) => i.source)));
const uniqueDestinations = Array.from(new Set(integrations.map((i) => i.destination)));

export const governanceNodes = [
  ...uniqueSources.map((s, i) => ({
    id: `src-${i}`,
    position: { x: 40, y: 40 + i * 70 },
    data: { label: s },
    style: nodeStyle("#0891b2"),
  })),
  {
    id: "engine",
    position: {
      x: 320,
      y: 40 + ((Math.max(uniqueSources.length, uniqueDestinations.length) - 1) * 70) / 2,
    },
    data: { label: "Interop Engine" },
    style: nodeStyle("#1d4ed8"),
  },
  ...uniqueDestinations.map((d, i) => ({
    id: `dst-${i}`,
    position: { x: 600, y: 40 + i * 70 },
    data: { label: d },
    style: nodeStyle("#0d9488"),
  })),
];

export const governanceEdges = [
  ...uniqueSources.map((s, i) => ({
    id: `e-src-${i}`,
    source: `src-${i}`,
    target: "engine",
    animated: true,
    style: { stroke: "#38bdf8" },
  })),
  ...uniqueDestinations.map((d, i) => ({
    id: `e-dst-${i}`,
    source: "engine",
    target: `dst-${i}`,
    animated: true,
    style: { stroke: "#5eead4" },
  })),
];

export const recentMessages = [
  { id: "MSG-9821", type: "ADT^A01", status: "Success", timestamp: "10:42" },
  { id: "MSG-9822", type: "ADT^A01", status: "Success", timestamp: "10:43" },
  { id: "MSG-9823", type: "ADT^A01", status: "Warning", timestamp: "10:44" },
  { id: "MSG-9824", type: "ORU^R01", status: "Success", timestamp: "10:45" },
  { id: "MSG-9825", type: "ADT^A04", status: "Failed", timestamp: "10:48" },
];

export const platformMetrics = {
  activeIntegrations: integrations.length,
  readinessScore: 94,
  failedMappings: 17,
  systemHealth: "99.97%",
  uptime: "99.97%",
  messagesPerDay: "12,840",
  successRate: "99.2%",
  avgLatency: "148ms",
  apiHealthP95: "168ms",
  schemaValidation: "12,712 / 12,840",
  terminologyBinding: "12,801 / 12,840",
  requiredElements: "12,684 / 12,840",
  ukCoreProfile: "12,798 / 12,840",
  parsedSegments: 152840,
  mappedFields: 487291,
  resourcesCreated: 38120,
  errors: 128,
  mappingTotalFields: 124,
  mappingMappedFields: 118,
};

// ============================================================================
// Per-project message catalog. Every messageId maps to a project so the
// Reasoning page can render source/destination-specific HL7 + FHIR samples.
// ============================================================================

export type MessageField = {
  key: string;
  label: string;
  fhirKey: string;
  segment: string;
  index: number;
};

export type MessageDetail = {
  projectId: string;
  projectName: string;
  source: string;
  destination: string;
  type: string;
  status: "Success" | "Warning" | "Failed";
  timestamp: string;
  hl7: string;
  fhir: Record<string, unknown>;
  fields: MessageField[];
  reasoningSteps: { step: number; title: string; detail: string }[];
};

const adtPatientFields: MessageField[] = [
  { key: "identifier", label: "Identifier (PID-3)", fhirKey: "identifier", segment: "PID", index: 3 },
  { key: "name", label: "Name (PID-5)", fhirKey: "name", segment: "PID", index: 5 },
  { key: "birthDate", label: "Date of Birth (PID-7)", fhirKey: "birthDate", segment: "PID", index: 7 },
  { key: "gender", label: "Gender (PID-8)", fhirKey: "gender", segment: "PID", index: 8 },
  { key: "address", label: "Address (PID-11)", fhirKey: "address", segment: "PID", index: 11 },
  { key: "telecom", label: "Phone (PID-13)", fhirKey: "telecom", segment: "PID", index: 13 },
];

const obsFields: MessageField[] = [
  { key: "identifier", label: "Identifier (OBX-3)", fhirKey: "identifier", segment: "OBX", index: 3 },
  { key: "code", label: "LOINC code (OBX-3)", fhirKey: "code", segment: "OBX", index: 3 },
  { key: "value", label: "Value (OBX-5)", fhirKey: "valueQuantity", segment: "OBX", index: 5 },
  { key: "unit", label: "Units (OBX-6)", fhirKey: "unit", segment: "OBX", index: 6 },
  { key: "refRange", label: "Reference range (OBX-7)", fhirKey: "referenceRange", segment: "OBX", index: 7 },
  { key: "status", label: "Status (OBX-11)", fhirKey: "status", segment: "OBX", index: 11 },
];

const imagingFields: MessageField[] = [
  { key: "accession", label: "Accession (OBR-3)", fhirKey: "identifier", segment: "OBR", index: 3 },
  { key: "modality", label: "Modality (OBR-24)", fhirKey: "modality", segment: "OBR", index: 24 },
  { key: "procedure", label: "Procedure (OBR-4)", fhirKey: "procedureCode", segment: "OBR", index: 4 },
  { key: "started", label: "Started (OBR-7)", fhirKey: "started", segment: "OBR", index: 7 },
  { key: "referrer", label: "Referrer (OBR-16)", fhirKey: "referrer", segment: "OBR", index: 16 },
  { key: "status", label: "Status (OBR-25)", fhirKey: "status", segment: "OBR", index: 25 },
];

const medFields: MessageField[] = [
  { key: "medication", label: "Medication (RXE-2)", fhirKey: "medicationCodeableConcept", segment: "RXE", index: 2 },
  { key: "dose", label: "Dose (RXE-3)", fhirKey: "doseQuantity", segment: "RXE", index: 3 },
  { key: "unit", label: "Unit (RXE-5)", fhirKey: "doseUnit", segment: "RXE", index: 5 },
  { key: "route", label: "Route (RXE-6)", fhirKey: "route", segment: "RXE", index: 6 },
  { key: "frequency", label: "Frequency (RXE-1)", fhirKey: "dosageInstruction", segment: "RXE", index: 1 },
  { key: "prescriber", label: "Prescriber (RXE-13)", fhirKey: "requester", segment: "RXE", index: 13 },
];

export const messageCatalog: Record<string, MessageDetail> = {
  // ============ int-001 Epic EHR → NHS FHIR (Patient) ============
  "MSG-9821": {
    projectId: "int-001",
    projectName: "Epic EHR",
    source: "Epic EHR",
    destination: "NHS FHIR API",
    type: "ADT^A01",
    status: "Success",
    timestamp: "10:42",
    hl7: `MSH|^~\\&|EPIC|TRUST|FHIRGW|NHS|202605301042||ADT^A01|MSG09821|P|2.5
PID|1||MRN12345^^^TRUST^MR||Doe^John^A||19780412|M|||221B Baker St^^London^^NW1 6XE^GBR||+44 20 7946 0958|||S||ACC998877
PV1|1|I|WARD3^201^A|||||REF^Smith^Jane^^^Dr|||||||||||V|||||||||||||||||||||||||202605301030`,
    fhir: {
      resourceType: "Patient",
      id: "pat-9821",
      identifier: [{ system: "https://trust.nhs.uk/mrn", value: "MRN12345" }],
      name: [{ family: "Doe", given: ["John", "A"] }],
      gender: "male",
      birthDate: "1978-04-12",
      address: [{ line: ["221B Baker St"], city: "London", postalCode: "NW1 6XE", country: "GBR" }],
      telecom: [{ system: "phone", value: "+44 20 7946 0958" }],
    },
    fields: adtPatientFields,
    reasoningSteps,
  },
  "MSG-9822": {
    projectId: "int-001",
    projectName: "Epic EHR",
    source: "Epic EHR",
    destination: "NHS FHIR API",
    type: "ADT^A01",
    status: "Success",
    timestamp: "10:43",
    hl7: `MSH|^~\\&|EPIC|TRUST|FHIRGW|NHS|202605301043||ADT^A01|MSG09822|P|2.5
PID|1||MRN77821^^^TRUST^MR||Patel^Anika^||19910822|F|||14 King's Rd^^Manchester^^M1 4AE^GBR||+44 161 555 0193|||M||ACC112233`,
    fhir: {
      resourceType: "Patient",
      id: "pat-9822",
      identifier: [{ system: "https://trust.nhs.uk/mrn", value: "MRN77821" }],
      name: [{ family: "Patel", given: ["Anika"] }],
      gender: "female",
      birthDate: "1991-08-22",
      address: [{ line: ["14 King's Rd"], city: "Manchester", postalCode: "M1 4AE", country: "GBR" }],
      telecom: [{ system: "phone", value: "+44 161 555 0193" }],
    },
    fields: adtPatientFields,
    reasoningSteps,
  },
  "MSG-9823": {
    projectId: "int-001",
    projectName: "Epic EHR",
    source: "Epic EHR",
    destination: "NHS FHIR API",
    type: "ADT^A01",
    status: "Warning",
    timestamp: "10:44",
    hl7: `MSH|^~\\&|EPIC|TRUST|FHIRGW|NHS|202605301044||ADT^A01|MSG09823|P|2.5
PID|1||MRN55410^^^TRUST^MR||O'Brien^Liam^||19650101|M||||||+44 20 7946 7711|||W||ACC445566`,
    fhir: {
      resourceType: "Patient",
      id: "pat-9823",
      identifier: [{ system: "https://trust.nhs.uk/mrn", value: "MRN55410" }],
      name: [{ family: "O'Brien", given: ["Liam"] }],
      gender: "male",
      birthDate: "1965-01-01",
      address: [],
      telecom: [{ system: "phone", value: "+44 20 7946 7711" }],
    },
    fields: adtPatientFields,
    reasoningSteps,
  },

  // ============ int-002 Cerner Lab → FHIR Observation ============
  "MSG-LAB-401": {
    projectId: "int-002",
    projectName: "Cerner Lab Results",
    source: "Cerner Lab",
    destination: "FHIR Observation",
    type: "ORU^R01",
    status: "Success",
    timestamp: "10:45",
    hl7: `MSH|^~\\&|CERNER|LAB|FHIRGW|NHS|202605301045||ORU^R01|MSGLAB401|P|2.5
PID|1||MRN44120^^^TRUST^MR||Khan^Sara
OBR|1|ORD-998|ACC-LAB-401|718-7^Hemoglobin^LN|||202605301030
OBX|1|NM|718-7^Hemoglobin^LN||13.4|g/dL|12.0-15.5|N|||F`,
    fhir: {
      resourceType: "Observation",
      id: "obs-lab-401",
      status: "final",
      identifier: [{ system: "urn:ord", value: "ORD-998" }],
      code: { coding: [{ system: "http://loinc.org", code: "718-7", display: "Hemoglobin" }] },
      valueQuantity: { value: 13.4, unit: "g/dL", system: "http://unitsofmeasure.org" },
      unit: "g/dL",
      referenceRange: [{ low: { value: 12.0 }, high: { value: 15.5 } }],
    },
    fields: obsFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ORU^R01 from CERNER LAB routed to FHIRGW." },
      { step: 2, title: "OBR linked", detail: "Order ORD-998 mapped to ServiceRequest reference." },
      { step: 3, title: "LOINC normalized", detail: "Code 718-7 bound to LOINC (Hemoglobin)." },
      { step: 4, title: "Value typed", detail: "NM value coerced to valueQuantity with UCUM g/dL." },
      { step: 5, title: "Reference range parsed", detail: "Range '12.0-15.5' split into low/high components." },
      { step: 6, title: "Status mapped", detail: "OBX-11 'F' mapped to FHIR Observation.status 'final'." },
      { step: 7, title: "Push to FHIR", detail: "POST /Observation — 201 Created." },
    ],
  },
  "MSG-LAB-402": {
    projectId: "int-002",
    projectName: "Cerner Lab Results",
    source: "Cerner Lab",
    destination: "FHIR Observation",
    type: "ORU^R01",
    status: "Warning",
    timestamp: "10:47",
    hl7: `MSH|^~\\&|CERNER|LAB|FHIRGW|NHS|202605301047||ORU^R01|MSGLAB402|P|2.5
OBR|1|ORD-999|ACC-LAB-402|2345-7^Glucose^LN|||202605301032
OBX|1|NM|2345-7^Glucose^LN||7.8|mmol/L|3.9-5.6|H|||P`,
    fhir: {
      resourceType: "Observation",
      id: "obs-lab-402",
      status: "preliminary",
      identifier: [{ system: "urn:ord", value: "ORD-999" }],
      code: { coding: [{ system: "http://loinc.org", code: "2345-7", display: "Glucose" }] },
      valueQuantity: { value: 7.8, unit: "mmol/L", system: "http://unitsofmeasure.org" },
      unit: "mmol/L",
      referenceRange: [{ low: { value: 3.9 }, high: { value: 5.6 } }],
    },
    fields: obsFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ORU^R01 routed." },
      { step: 2, title: "LOINC bound", detail: "Code 2345-7 (Glucose) verified." },
      { step: 3, title: "Value flagged", detail: "Result 7.8 mmol/L exceeds high reference (5.6)." },
      { step: 4, title: "Status preliminary", detail: "OBX-11 'P' mapped to FHIR status 'preliminary'." },
      { step: 5, title: "Push", detail: "POST /Observation — 201 Created with warning flag." },
    ],
  },
  "MSG-LAB-403": {
    projectId: "int-002",
    projectName: "Cerner Lab Results",
    source: "Cerner Lab",
    destination: "FHIR Observation",
    type: "ORU^R01",
    status: "Success",
    timestamp: "10:51",
    hl7: `MSH|^~\\&|CERNER|LAB|FHIRGW|NHS|202605301051||ORU^R01|MSGLAB403|P|2.5
OBX|1|NM|2160-0^Creatinine^LN||78|umol/L|59-104|N|||F`,
    fhir: {
      resourceType: "Observation",
      id: "obs-lab-403",
      status: "final",
      code: { coding: [{ system: "http://loinc.org", code: "2160-0", display: "Creatinine" }] },
      valueQuantity: { value: 78, unit: "umol/L" },
      unit: "umol/L",
      referenceRange: [{ low: { value: 59 }, high: { value: 104 } }],
    },
    fields: obsFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ORU^R01 routed." },
      { step: 2, title: "LOINC bound", detail: "Code 2160-0 (Creatinine) verified." },
      { step: 3, title: "Push", detail: "POST /Observation — 201 Created." },
    ],
  },

  // ============ int-003 PACS → FHIR ImagingStudy ============
  "MSG-IMG-201": {
    projectId: "int-003",
    projectName: "Radiology Imaging Feed",
    source: "PACS",
    destination: "FHIR ImagingStudy",
    type: "ORM^O01",
    status: "Success",
    timestamp: "09:18",
    hl7: `MSH|^~\\&|PACS|RAD|FHIRGW|NHS|202605300918||ORM^O01|MSGIMG201|P|2.5
OBR|1|ORD-IMG-1|ACC-2026-0042|RAD-CHEST^Chest X-Ray^L|||202605300900|||||||||REF^Smith^Jane^^^Dr||||||||||CR||||CM`,
    fhir: {
      resourceType: "ImagingStudy",
      id: "img-201",
      identifier: [{ system: "urn:accession", value: "ACC-2026-0042" }],
      modality: [{ system: "http://dicom.nema.org/resources/ontology/DCM", code: "CR" }],
      procedureCode: [{ coding: [{ code: "RAD-CHEST", display: "Chest X-Ray" }] }],
      started: "2026-05-30T09:00:00Z",
      referrer: { display: "Dr Jane Smith" },
      status: "available",
    },
    fields: imagingFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ORM^O01 from PACS routed to FHIRGW." },
      { step: 2, title: "Accession captured", detail: "OBR-3 ACC-2026-0042 → ImagingStudy.identifier." },
      { step: 3, title: "Modality mapped", detail: "OBR-24 'CR' bound to DICOM modality." },
      { step: 4, title: "Start time normalized", detail: "OBR-7 converted to ISO-8601." },
      { step: 5, title: "Push", detail: "POST /ImagingStudy — 201 Created." },
    ],
  },
  "MSG-IMG-202": {
    projectId: "int-003",
    projectName: "Radiology Imaging Feed",
    source: "PACS",
    destination: "FHIR ImagingStudy",
    type: "ORM^O01",
    status: "Success",
    timestamp: "09:32",
    hl7: `MSH|^~\\&|PACS|RAD|FHIRGW|NHS|202605300932||ORM^O01|MSGIMG202|P|2.5
OBR|1|ORD-IMG-2|ACC-2026-0043|RAD-CT-HEAD^CT Head^L|||202605300915|||||||||REF^Carter^Mia^^^Dr||||||||||CT||||CM`,
    fhir: {
      resourceType: "ImagingStudy",
      id: "img-202",
      identifier: [{ system: "urn:accession", value: "ACC-2026-0043" }],
      modality: [{ code: "CT" }],
      procedureCode: [{ coding: [{ code: "RAD-CT-HEAD", display: "CT Head" }] }],
      started: "2026-05-30T09:15:00Z",
      referrer: { display: "Dr Mia Carter" },
      status: "available",
    },
    fields: imagingFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ORM^O01 routed." },
      { step: 2, title: "Modality mapped", detail: "CT modality bound." },
      { step: 3, title: "Push", detail: "POST /ImagingStudy — 201 Created." },
    ],
  },

  // ============ int-004 Sunquest → FHIR DiagnosticReport ============
  "MSG-PATH-301": {
    projectId: "int-004",
    projectName: "Pathology HL7 v2 Pipeline",
    source: "Sunquest",
    destination: "FHIR DiagnosticReport",
    type: "ORU^R01",
    status: "Failed",
    timestamp: "08:14",
    hl7: `MSH|^~\\&|SUNQ|PATH|FHIRGW|NHS|202605300814||ORU^R01|MSGPATH301|P|2.5
OBR|1|ORD-P-1|ACC-P-301|HISTO^Histopathology^L|||202605300700
OBX|1|TX|HISTO^Histopathology^L||Suspicious cells detected||||||F`,
    fhir: {
      resourceType: "DiagnosticReport",
      id: "dr-path-301",
      status: "final",
      identifier: [{ system: "urn:accession", value: "ACC-P-301" }],
      code: { coding: [{ code: "HISTO", display: "Histopathology" }] },
      conclusion: "Suspicious cells detected",
    },
    fields: obsFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ORU^R01 from SUNQ routed." },
      { step: 2, title: "OBR mapped", detail: "Histopathology service captured." },
      { step: 3, title: "Validation failed", detail: "Missing SNOMED CT binding for HISTO code." },
      { step: 4, title: "Push rejected", detail: "POST /DiagnosticReport — 422 Unprocessable Entity." },
    ],
  },
  "MSG-PATH-302": {
    projectId: "int-004",
    projectName: "Pathology HL7 v2 Pipeline",
    source: "Sunquest",
    destination: "FHIR DiagnosticReport",
    type: "ORU^R01",
    status: "Warning",
    timestamp: "08:42",
    hl7: `MSH|^~\\&|SUNQ|PATH|FHIRGW|NHS|202605300842||ORU^R01|MSGPATH302|P|2.5
OBR|1|ORD-P-2|ACC-P-302|MICRO^Microbiology^L|||202605300740
OBX|1|TX|MICRO^Microbiology^L||No growth after 48h||||||F`,
    fhir: {
      resourceType: "DiagnosticReport",
      id: "dr-path-302",
      status: "final",
      identifier: [{ system: "urn:accession", value: "ACC-P-302" }],
      code: { coding: [{ code: "MICRO", display: "Microbiology" }] },
      conclusion: "No growth after 48h",
    },
    fields: obsFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ORU^R01 routed." },
      { step: 2, title: "Terminology warn", detail: "Local code MICRO retained — no SNOMED CT match." },
      { step: 3, title: "Push", detail: "POST /DiagnosticReport — 201 Created with warning." },
    ],
  },

  // ============ int-005 Meditech → FHIR MedicationRequest ============
  "MSG-RX-501": {
    projectId: "int-005",
    projectName: "Pharmacy Orders",
    source: "Meditech",
    destination: "FHIR MedicationRequest",
    type: "RDE^O11",
    status: "Success",
    timestamp: "11:02",
    hl7: `MSH|^~\\&|MEDITECH|PHARM|FHIRGW|NHS|202605301102||RDE^O11|MSGRX501|P|2.5
ORC|NW|RX-501|||||||202605301100|||DR-001
RXE|1|387458008^Amoxicillin^SCT|500|500|mg|PO|||||||DR-001`,
    fhir: {
      resourceType: "MedicationRequest",
      id: "rx-501",
      status: "active",
      intent: "order",
      medicationCodeableConcept: { coding: [{ system: "http://snomed.info/sct", code: "387458008", display: "Amoxicillin" }] },
      doseQuantity: { value: 500, unit: "mg" },
      doseUnit: "mg",
      route: { coding: [{ code: "PO", display: "Oral" }] },
      dosageInstruction: [{ text: "500 mg PO" }],
      requester: { reference: "Practitioner/DR-001" },
    },
    fields: medFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "RDE^O11 from MEDITECH routed." },
      { step: 2, title: "SNOMED bound", detail: "Code 387458008 (Amoxicillin) verified." },
      { step: 3, title: "Dose normalized", detail: "Dose 500 mg captured as Quantity." },
      { step: 4, title: "Route mapped", detail: "Route 'PO' bound to FHIR route Oral." },
      { step: 5, title: "Push", detail: "POST /MedicationRequest — 201 Created." },
    ],
  },
  "MSG-RX-502": {
    projectId: "int-005",
    projectName: "Pharmacy Orders",
    source: "Meditech",
    destination: "FHIR MedicationRequest",
    type: "RDE^O11",
    status: "Success",
    timestamp: "11:14",
    hl7: `MSH|^~\\&|MEDITECH|PHARM|FHIRGW|NHS|202605301114||RDE^O11|MSGRX502|P|2.5
RXE|1|387207008^Paracetamol^SCT|1000|1000|mg|PO|||||||DR-014`,
    fhir: {
      resourceType: "MedicationRequest",
      id: "rx-502",
      status: "active",
      intent: "order",
      medicationCodeableConcept: { coding: [{ system: "http://snomed.info/sct", code: "387207008", display: "Paracetamol" }] },
      doseQuantity: { value: 1000, unit: "mg" },
      doseUnit: "mg",
      route: { coding: [{ code: "PO", display: "Oral" }] },
      dosageInstruction: [{ text: "1000 mg PO" }],
      requester: { reference: "Practitioner/DR-014" },
    },
    fields: medFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "RDE^O11 routed." },
      { step: 2, title: "SNOMED bound", detail: "Code 387207008 (Paracetamol) verified." },
      { step: 3, title: "Push", detail: "POST /MedicationRequest — 201 Created." },
    ],
  },

  // ============ int-006 Internal → NHS Spine ============
  "MSG-SPN-601": {
    projectId: "int-006",
    projectName: "NHS Spine Connector",
    source: "Internal",
    destination: "NHS Spine",
    type: "ADT^A04",
    status: "Success",
    timestamp: "07:55",
    hl7: `MSH|^~\\&|INTERNAL|TRUST|SPINE|NHS|202605300755||ADT^A04|MSGSPN601|P|2.5
PID|1||9434765919^^^NHS^NH||Brown^Olivia^||19880204|F|||9 High St^^Leeds^^LS1 4DT^GBR||+44 113 555 0124|||S||ACC778899`,
    fhir: {
      resourceType: "Patient",
      id: "spn-601",
      identifier: [{ system: "https://fhir.nhs.uk/Id/nhs-number", value: "9434765919" }],
      name: [{ family: "Brown", given: ["Olivia"] }],
      gender: "female",
      birthDate: "1988-02-04",
      address: [{ line: ["9 High St"], city: "Leeds", postalCode: "LS1 4DT", country: "GBR" }],
      telecom: [{ system: "phone", value: "+44 113 555 0124" }],
    },
    fields: adtPatientFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ADT^A04 from INTERNAL routed to SPINE." },
      { step: 2, title: "NHS number validated", detail: "Mod-11 check passed for 9434765919." },
      { step: 3, title: "Demographics mapped", detail: "PID fields normalized to UK Core Patient." },
      { step: 4, title: "Push to Spine", detail: "POST /Patient — 201 Created." },
    ],
  },
  "MSG-SPN-602": {
    projectId: "int-006",
    projectName: "NHS Spine Connector",
    source: "Internal",
    destination: "NHS Spine",
    type: "ADT^A04",
    status: "Success",
    timestamp: "08:20",
    hl7: `MSH|^~\\&|INTERNAL|TRUST|SPINE|NHS|202605300820||ADT^A04|MSGSPN602|P|2.5
PID|1||9876543210^^^NHS^NH||Williams^Noah^||19720517|M|||3 Park Ln^^Bristol^^BS1 5TR^GBR||+44 117 555 0188|||M||ACC889900`,
    fhir: {
      resourceType: "Patient",
      id: "spn-602",
      identifier: [{ system: "https://fhir.nhs.uk/Id/nhs-number", value: "9876543210" }],
      name: [{ family: "Williams", given: ["Noah"] }],
      gender: "male",
      birthDate: "1972-05-17",
      address: [{ line: ["3 Park Ln"], city: "Bristol", postalCode: "BS1 5TR", country: "GBR" }],
      telecom: [{ system: "phone", value: "+44 117 555 0188" }],
    },
    fields: adtPatientFields,
    reasoningSteps: [
      { step: 1, title: "MSH parsed", detail: "ADT^A04 routed." },
      { step: 2, title: "NHS number validated", detail: "Mod-11 check passed." },
      { step: 3, title: "Push to Spine", detail: "POST /Patient — 201 Created." },
    ],
  },
};

// Messages grouped by project for the project detail page.
export const projectMessages: Record<string, { id: string; type: string; status: string; timestamp: string }[]> =
  Object.values(messageCatalog).reduce(
    (acc, m) => {
      (acc[m.projectId] ||= []).push({
        id: Object.keys(messageCatalog).find((k) => messageCatalog[k] === m)!,
        type: m.type,
        status: m.status,
        timestamp: m.timestamp,
      });
      return acc;
    },
    {} as Record<string, { id: string; type: string; status: string; timestamp: string }[]>,
  );
