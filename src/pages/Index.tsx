
import { useState } from 'react';
import { Upload, X, FileText, Image, Music, Video, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface SelectedFile {
  id: string;
  file: File;
  type: 'image' | 'video' | 'audio' | 'document' | 'other';
}

const getFileType = (file: File): SelectedFile['type'] => {
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  if (file.type.startsWith('audio/')) return 'audio';
  if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
  return 'other';
};

const getFileIcon = (type: SelectedFile['type']) => {
  switch (type) {
    case 'image': return Image;
    case 'video': return Video;
    case 'audio': return Music;
    case 'document': return FileText;
    default: return File;
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Index = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles: SelectedFile[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      type: getFileType(file)
    }));
    
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleUpload = () => {
    // Simulate upload and navigate to dashboard
    console.log('Uploading files:', selectedFiles);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FileShare
          </h1>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/pricing')}>
              Pricing
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Share Files Instantly
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload, share, and transfer your files securely. No registration required for quick transfers.
          </p>
        </div>

        {/* File Upload Area */}
        <Card className="max-w-4xl mx-auto p-8 mb-8 transition-all duration-300 hover:shadow-xl">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Drop files here</h3>
            <p className="text-gray-600 mb-6">or click to browse</p>
            <input
              type="file"
              multiple
              className="hidden"
              id="file-input"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <Button
              size="lg"
              onClick={() => document.getElementById('file-input')?.click()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Choose Files
            </Button>
            <p className="text-sm text-gray-500 mt-4">Maximum file size: 2GB per file</p>
          </div>
        </Card>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <Card className="max-w-4xl mx-auto p-6 animate-scale-in">
            <h3 className="text-xl font-semibold mb-4">Selected Files ({selectedFiles.length})</h3>
            <div className="space-y-3 mb-6">
              {selectedFiles.map((selectedFile) => {
                const Icon = getFileIcon(selectedFile.type);
                return (
                  <div
                    key={selectedFile.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{selectedFile.file.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(selectedFile.file.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(selectedFile.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedFiles([])}
              >
                Clear All
              </Button>
              <Button
                size="lg"
                onClick={handleUpload}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Upload Files ({selectedFiles.length})
              </Button>
            </div>
          </Card>
        )}

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 hover-scale">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Upload</h3>
            <p className="text-gray-600">Upload files quickly with our optimized servers</p>
          </div>
          
          <div className="text-center p-6 hover-scale">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Sharing</h3>
            <p className="text-gray-600">Share files securely with encrypted links</p>
          </div>
          
          <div className="text-center p-6 hover-scale">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Any File Type</h3>
            <p className="text-gray-600">Support for all file types and formats</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
