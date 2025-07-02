
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Copy, Mail, MessageSquare, Calendar, Shield, FileText } from 'lucide-react';

const FileShare = () => {
  const { fileId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [downloadCount, setDownloadCount] = useState(23);

  // Mock file data
  const file = {
    id: fileId,
    name: 'Project_Presentation.pdf',
    size: '2.4 MB',
    type: 'PDF',
    uploadDate: '2024-01-15',
    expiresIn: '6 days',
    password: false
  };

  const shareUrl = `https://fileshare.app/download/${fileId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    // Simulate download
    console.log('Downloading file:', file.name);
  };

  const handleSendEmail = () => {
    const subject = `Check out this file: ${file.name}`;
    const body = `I've shared a file with you: ${file.name}\n\nDownload it here: ${shareUrl}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FileShare
          </h1>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* File Preview Card */}
          <Card className="p-8 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{file.name}</h2>
                  <p className="text-gray-600">{file.size} • {file.type}</p>
                </div>
              </div>
              
              <Button 
                onClick={handleDownload}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Download className="h-5 w-5 mr-2" />
                Download
              </Button>
            </div>

            {/* File Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Download className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Downloads</p>
                  <p className="font-semibold text-gray-900">{downloadCount}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Expires in</p>
                  <p className="font-semibold text-gray-900">{file.expiresIn}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Security</p>
                  <p className="font-semibold text-gray-900">
                    {file.password ? 'Password Protected' : 'Public Link'}
                  </p>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Share this file</h3>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <div className="flex-1">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className={copied ? "bg-green-50 text-green-700 border-green-200" : ""}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={handleSendEmail}
                  className="flex-1 min-w-0"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send via Email
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this file: ${shareUrl}`)}`)}
                  className="flex-1 min-w-0"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Notice */}
          <Card className="p-6 bg-blue-50 border-blue-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Security & Privacy</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  This file is stored securely and will be automatically deleted after 7 days. 
                  Only people with this link can access the file. We recommend sharing this link 
                  only with trusted recipients.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FileShare;
