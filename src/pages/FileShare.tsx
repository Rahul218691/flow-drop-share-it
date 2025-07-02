
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FileShare
            </h1>
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full sm:w-auto">
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* File Preview Card */}
          <Card className="p-4 sm:p-8 mb-6 sm:mb-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{file.name}</h2>
                  <p className="text-sm sm:text-base text-gray-600">{file.size} • {file.type}</p>
                </div>
              </div>
              
              <Button 
                onClick={handleDownload}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full sm:w-auto"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Download
              </Button>
            </div>

            {/* File Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Downloads</p>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{downloadCount}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Expires in</p>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{file.expiresIn}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Security</p>
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {file.password ? 'Password Protected' : 'Public Link'}
                  </p>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="border-t pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Share this file</h3>
              
              <div className="flex flex-col gap-4 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="bg-gray-50 text-xs sm:text-sm flex-1"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className={`${copied ? "bg-green-50 text-green-700 border-green-200" : ""} w-full sm:w-auto`}
                  >
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  onClick={handleSendEmail}
                  className="w-full"
                >
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Send via Email
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this file: ${shareUrl}`)}`)}
                  className="w-full"
                >
                  <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Notice */}
          <Card className="p-4 sm:p-6 bg-blue-50 border-blue-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Security & Privacy</h4>
                <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
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
