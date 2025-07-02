
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileText, Download, Share2, Trash2, Search, Grid, List, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: string;
  downloads: number;
  shared: boolean;
}

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Project_Presentation.pdf',
    size: '2.4 MB',
    type: 'PDF',
    uploadDate: '2024-01-15',
    downloads: 12,
    shared: true
  },
  {
    id: '2',
    name: 'Holiday_Photos.zip',
    size: '15.7 MB',
    type: 'ZIP',
    uploadDate: '2024-01-14',
    downloads: 5,
    shared: false
  },
  {
    id: '3',
    name: 'Meeting_Recording.mp4',
    size: '45.2 MB',
    type: 'Video',
    uploadDate: '2024-01-13',
    downloads: 8,
    shared: true
  },
  {
    id: '4',
    name: 'Design_Assets.sketch',
    size: '8.9 MB',
    type: 'Sketch',
    uploadDate: '2024-01-12',
    downloads: 3,
    shared: false
  }
];

const Dashboard = () => {
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (fileId: string) => {
    navigate(`/share/${fileId}`);
  };

  const handleDelete = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FileShare Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/pricing')}>
              Upgrade
            </Button>
            <Button onClick={() => navigate('/')}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Files</p>
                <p className="text-2xl font-bold text-gray-900">{files.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
          
          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">
                  {files.reduce((sum, file) => sum + file.downloads, 0)}
                </p>
              </div>
              <Download className="h-8 w-8 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shared Files</p>
                <p className="text-2xl font-bold text-gray-900">
                  {files.filter(file => file.shared).length}
                </p>
              </div>
              <Share2 className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
          
          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900">72.2 MB</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">75%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Files Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFiles.map((file, index) => (
              <Card 
                key={file.id} 
                className="p-6 hover:shadow-lg transition-all duration-300 animate-scale-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  {file.shared && (
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Shared
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1 truncate" title={file.name}>
                  {file.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{file.size} • {file.type}</p>
                <p className="text-xs text-gray-400 mb-4">
                  Uploaded {file.uploadDate} • {file.downloads} downloads
                </p>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(file.id)}
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(file.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Downloads
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFiles.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{file.name}</div>
                            {file.shared && (
                              <div className="text-xs text-green-600">Shared</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {file.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {file.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {file.uploadDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {file.downloads}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(file.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {filteredFiles.length === 0 && (
          <Card className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search term' : 'Upload your first file to get started'}
            </p>
            <Button onClick={() => navigate('/')}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
