import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  // Basic Information
  fullName: string;
  email: string;
  company: string;
  role: string;
  
  // Business Context
  companySector: string;
  teamSize: string;
  monthlyLeads: string;
  budget: string;
  currentChallenges: string;
  timeline: string;
  
  // Consent
  gdprConsent: boolean;
  marketingConsent?: boolean;
  
  // Lead Management
  status: 'new' | 'contacted' | 'qualified' | 'demo_scheduled' | 'proposal_sent' | 'closed_won' | 'closed_lost';
  score: number; // Lead score 0-100
  source: string; // Where the lead came from
  assignedTo?: mongoose.Types.ObjectId; // User ID
  notes: string[];
  
  // Communication tracking
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  
  // ROI Calculator data (if submitted)
  roiData?: {
    currentLeads: number;
    conversionRate: number;
    averageDealValue: number;
    salesCycleMonths: number;
    sdrSalary: number;
    projectedROI: number;
  };
  
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>({
  // Basic Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [50, 'Role cannot be more than 50 characters']
  },
  
  // Business Context
  companySector: {
    type: String,
    required: [true, 'Company sector is required'],
    enum: ['saas', 'fintech', 'ecommerce', 'startup', 'consulting', 'other']
  },
  teamSize: {
    type: String,
    required: [true, 'Team size is required'],
    enum: ['1-5', '6-15', '16-50', '51+']
  },
  monthlyLeads: {
    type: String,
    required: [true, 'Monthly leads is required'],
    enum: ['<100', '100-500', '500-1000', '1000+']
  },
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    enum: ['<5k', '5k-15k', '15k-30k', '30k+']
  },
  currentChallenges: {
    type: String,
    required: [true, 'Current challenges is required'],
    minlength: [10, 'Challenges description must be at least 10 characters'],
    maxlength: [1000, 'Challenges description cannot be more than 1000 characters']
  },
  timeline: {
    type: String,
    required: [true, 'Timeline is required'],
    enum: ['immediate', '30days', '90days', 'planning']
  },
  
  // Consent
  gdprConsent: {
    type: Boolean,
    required: [true, 'GDPR consent is required'],
    validate: {
      validator: function(v: boolean) { return v === true; },
      message: 'GDPR consent must be accepted'
    }
  },
  marketingConsent: {
    type: Boolean,
    default: false
  },
  
  // Lead Management
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'demo_scheduled', 'proposal_sent', 'closed_won', 'closed_lost'],
    default: 'new'
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  source: {
    type: String,
    default: 'website'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: [{
    type: String,
    maxlength: [500, 'Note cannot be more than 500 characters']
  }],
  
  // Communication tracking
  lastContactDate: Date,
  nextFollowUpDate: Date,
  
  // ROI Calculator data
  roiData: {
    currentLeads: Number,
    conversionRate: Number,
    averageDealValue: Number,
    salesCycleMonths: Number,
    sdrSalary: Number,
    projectedROI: Number
  }
}, {
  timestamps: true
});

// Indexes for performance
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ companySector: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ score: -1 });

// Calculate lead score based on profile
leadSchema.pre('save', function(next) {
  if (this.isNew) {
    let score = 0;
    
    // Budget scoring (30 points max)
    if (this.budget === '30k+') score += 30;
    else if (this.budget === '15k-30k') score += 25;
    else if (this.budget === '5k-15k') score += 15;
    else score += 5;
    
    // Team size scoring (20 points max)
    if (this.teamSize === '51+') score += 20;
    else if (this.teamSize === '16-50') score += 15;
    else if (this.teamSize === '6-15') score += 10;
    else score += 5;
    
    // Timeline scoring (20 points max)
    if (this.timeline === 'immediate') score += 20;
    else if (this.timeline === '30days') score += 15;
    else if (this.timeline === '90days') score += 10;
    else score += 5;
    
    // Volume scoring (15 points max)
    if (this.monthlyLeads === '1000+') score += 15;
    else if (this.monthlyLeads === '500-1000') score += 12;
    else if (this.monthlyLeads === '100-500') score += 8;
    else score += 3;
    
    // Sector scoring (10 points max)
    if (['saas', 'fintech', 'startup'].includes(this.companySector)) score += 10;
    else score += 5;
    
    // Marketing consent bonus (5 points)
    if (this.marketingConsent) score += 5;
    
    this.score = Math.min(score, 100);
  }
  next();
});

export default mongoose.model<ILead>('Lead', leadSchema);