import { useState, useEffect } from 'react';
import { testDatabaseConnection } from '@/lib/database';
import { hybridLeadService } from '@/services/hybridLeadService';
import { databaseLeadService } from '@/services/database/leadService';
import { Database, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const DatabaseTestPage = () => {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'failed' | 'untested'>('untested');
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runConnectionTest = async () => {
    setIsRunning(true);
    setConnectionStatus('loading');
    const results: any[] = [];

    try {
      // Test 1: Basic connection
      results.push({
        test: 'Basic Database Connection',
        status: 'loading',
        message: 'Testing connection to MySQL...'
      });
      setTestResults([...results]);

      const isConnected = await testDatabaseConnection();
      results[0].status = isConnected ? 'success' : 'error';
      results[0].message = isConnected ? 'Connected successfully' : 'Connection failed';
      setConnectionStatus(isConnected ? 'connected' : 'failed');

      // Test 2: Prisma Client Generation
      results.push({
        test: 'Prisma Client',
        status: 'loading',
        message: 'Checking Prisma client...'
      });
      setTestResults([...results]);

      try {
        // This will fail if Prisma client is not generated
        await databaseLeadService.getLeadStats();
        results[1].status = 'success';
        results[1].message = 'Prisma client working';
      } catch (error: any) {
        results[1].status = 'warning';
        results[1].message = `Prisma client issue: ${error.message}`;
      }

      // Test 3: Database Schema
      results.push({
        test: 'Database Schema',
        status: 'loading',
        message: 'Checking if tables exist...'
      });
      setTestResults([...results]);

      try {
        const stats = await databaseLeadService.getLeadStats();
        results[2].status = 'success';
        results[2].message = 'Database schema is ready';
        results[2].data = stats;
      } catch (error: any) {
        results[2].status = 'warning';
        results[2].message = `Schema may need migration: ${error.message}`;
      }

      // Test 4: Hybrid Service
      results.push({
        test: 'Hybrid Lead Service',
        status: 'loading',
        message: 'Testing lead service...'
      });
      setTestResults([...results]);

      try {
        const leadsResult = await hybridLeadService.getLeads({ page: 1, limit: 1 });
        results[3].status = 'success';
        results[3].message = `Service working - ${leadsResult.pagination.total} leads available`;
      } catch (error: any) {
        results[3].status = 'warning';
        results[3].message = `Service using fallback: ${error.message}`;
      }

      // Test 5: CRUD Operations (if connected)
      if (isConnected) {
        results.push({
          test: 'CRUD Operations',
          status: 'loading',
          message: 'Testing create/read operations...'
        });
        setTestResults([...results]);

        try {
          // Try to create a test lead
          const testLead = {
            fullName: 'Test Lead - DatabaseTest',
            email: 'test@databasetest.com',
            company: 'Test Company',
            role: 'Tester',
            companySector: 'saas',
            teamSize: '1-5',
            monthlyLeads: '<100',
            budget: '<5k',
            currentChallenges: 'Testing database connection',
            timeline: 'immediate',
            gdprConsent: true,
            marketingConsent: true,
            status: 'new' as any,
            score: 100,
            source: 'Database Test'
          };

          const createdLead = await databaseLeadService.createLead(testLead);
          
          if (createdLead) {
            // Clean up test lead
            await databaseLeadService.deleteLead(createdLead._id);
            results[4].status = 'success';
            results[4].message = 'CRUD operations working perfectly';
          } else {
            results[4].status = 'warning';
            results[4].message = 'Create operation failed';
          }
        } catch (error: any) {
          results[4].status = 'error';
          results[4].message = `CRUD operations failed: ${error.message}`;
        }
      }

    } catch (error: any) {
      results.push({
        test: 'Connection Test Failed',
        status: 'error',
        message: error.message
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  useEffect(() => {
    // Auto-run test on component mount
    runConnectionTest();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'loading':
        return <RefreshCw className="h-5 w-5 text-blue-400 animate-spin" />;
      default:
        return <Database className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-500/40 bg-green-500/10';
      case 'error':
        return 'border-red-500/40 bg-red-500/10';
      case 'warning':
        return 'border-yellow-500/40 bg-yellow-500/10';
      case 'loading':
        return 'border-blue-500/40 bg-blue-500/10';
      default:
        return 'border-gray-500/40 bg-gray-500/10';
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-screen bg-pure-black text-pure-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-primary-300 to-secondary-300 bg-clip-text text-transparent">
            Database Connection Test
          </h1>
          <p className="text-gray-400 mt-2">
            Testing connection to MySQL database on EasyPanel
          </p>
        </div>
        <button
          onClick={runConnectionTest}
          disabled={isRunning}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 flex items-center gap-2"
        >
          {isRunning ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          {isRunning ? 'Testing...' : 'Run Test'}
        </button>
      </div>

      {/* Connection Status */}
      <div className={`p-6 rounded-2xl border ${getStatusColor(connectionStatus)} backdrop-blur-xl`}>
        <div className="flex items-center gap-4">
          {getStatusIcon(connectionStatus)}
          <div>
            <h3 className="text-xl font-bold text-white">
              Database Status: {connectionStatus === 'connected' ? 'Connected' : 
                               connectionStatus === 'failed' ? 'Disconnected' :
                               connectionStatus === 'loading' ? 'Testing...' : 'Not Tested'}
            </h3>
            <p className="text-gray-400">
              {connectionStatus === 'connected' ? 'Successfully connected to MySQL database' :
               connectionStatus === 'failed' ? 'Failed to connect to MySQL database' :
               connectionStatus === 'loading' ? 'Testing database connection...' :
               'Click "Run Test" to check database connectivity'}
            </p>
          </div>
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Test Results</h2>
          {testResults.map((result, index) => (
            <div key={index} className={`p-4 rounded-xl border ${getStatusColor(result.status)} backdrop-blur-xl`}>
              <div className="flex items-start gap-3">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <h4 className="font-bold text-white">{result.test}</h4>
                  <p className="text-gray-300 mt-1">{result.message}</p>
                  {result.data && (
                    <pre className="mt-2 p-3 bg-gray-800/50 rounded-lg text-xs text-gray-300 overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Database Configuration Info */}
      <div className="p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30">
        <h3 className="text-lg font-bold text-white mb-4">Database Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-gray-300">Host:</strong>
            <span className="ml-2 text-white">easypanel.roilabs.com.br</span>
          </div>
          <div>
            <strong className="text-gray-300">Port:</strong>
            <span className="ml-2 text-white">3307</span>
          </div>
          <div>
            <strong className="text-gray-300">Database:</strong>
            <span className="ml-2 text-white">roi_zenith</span>
          </div>
          <div>
            <strong className="text-gray-300">User:</strong>
            <span className="ml-2 text-white">roi_user</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTestPage;