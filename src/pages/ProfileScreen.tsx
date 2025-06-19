import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Download, Edit, Trash2, Search, Filter, Music, Calendar, Piano } from "lucide-react";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInstrument, setFilterInstrument] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  const userProfile = {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    subscription: "Premium",
    joinDate: "March 2024",
    arrangementsCount: 24
  };

  const savedArrangements = [
    {
      id: 1,
      title: "Für Elise",
      composer: "Beethoven",
      originalInstrument: "Piano",
      targetInstrument: "Violin",
      skillLevel: "Intermediate",
      dateCreated: "2024-06-15",
      thumbnail: "🎼"
    },
    {
      id: 2,
      title: "Canon in D",
      composer: "Pachelbel",
      originalInstrument: "Violin",
      targetInstrument: "Piano",
      skillLevel: "Beginner",
      dateCreated: "2024-06-12",
      thumbnail: "🎵"
    },
    {
      id: 3,
      title: "Ave Maria",
      composer: "Schubert",
      originalInstrument: "Piano",
      targetInstrument: "Guitar",
      skillLevel: "Intermediate",
      dateCreated: "2024-06-08",
      thumbnail: "🎶"
    },
    {
      id: 4,
      title: "Moonlight Sonata",
      composer: "Beethoven",
      originalInstrument: "Piano",
      targetInstrument: "Violin",
      skillLevel: "Advanced",
      dateCreated: "2024-06-05",
      thumbnail: "🎼"
    },
    {
      id: 5,
      title: "Spring (Vivaldi)",
      composer: "Vivaldi",
      originalInstrument: "Violin",
      targetInstrument: "Piano",
      skillLevel: "Advanced",
      dateCreated: "2024-06-01",
      thumbnail: "🎵"
    }
  ];

  const skillLevelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800"
  };

  const getInstrumentIcon = (instrument) => {
    switch (instrument.toLowerCase()) {
      case 'piano': return Piano;
      case 'violin': return Music;
      default: return Music;
    }
  };

  const filteredArrangements = savedArrangements.filter(arrangement => {
    const matchesSearch = arrangement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         arrangement.composer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInstrument = filterInstrument === 'all' || 
                             arrangement.targetInstrument.toLowerCase() === filterInstrument;
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'week' && new Date(arrangement.dateCreated) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                       (filterDate === 'month' && new Date(arrangement.dateCreated) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesInstrument && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-slate-800">My Library</h1>
            <p className="text-xs text-slate-500">{userProfile.arrangementsCount} arrangements</p>
          </div>
          <div className="w-9" /> {/* Spacer for center alignment */}
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-6 space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{userProfile.name}</CardTitle>
                <p className="text-sm text-slate-600">{userProfile.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gold-100 text-gold-800 text-xs">
                    {userProfile.subscription}
                  </Badge>
                  <span className="text-xs text-slate-500">Since {userProfile.joinDate}</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Find Arrangements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by title or composer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Instrument
                </label>
                <Select value={filterInstrument} onValueChange={setFilterInstrument}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="piano">Piano</SelectItem>
                    <SelectItem value="violin">Violin</SelectItem>
                    <SelectItem value="guitar">Guitar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">
                  Date
                </label>
                <Select value={filterDate} onValueChange={setFilterDate}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Arrangements List */}
        <div className="space-y-3">
          {filteredArrangements.map((arrangement) => {
            const TargetIcon = getInstrumentIcon(arrangement.targetInstrument);
            const OriginalIcon = getInstrumentIcon(arrangement.originalInstrument);
            
            return (
              <Card key={arrangement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{arrangement.thumbnail}</span>
                        <div>
                          <h3 className="font-medium text-slate-800">{arrangement.title}</h3>
                          <p className="text-sm text-slate-600">{arrangement.composer}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
                        <div className="flex items-center gap-1">
                          <OriginalIcon className="w-3 h-3" />
                          <span>{arrangement.originalInstrument}</span>
                        </div>
                        <span>→</span>
                        <div className="flex items-center gap-1">
                          <TargetIcon className="w-3 h-3" />
                          <span>{arrangement.targetInstrument}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${skillLevelColors[arrangement.skillLevel]}`}>
                          {arrangement.skillLevel}
                        </Badge>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(arrangement.dateCreated).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Re-adapt
                    </Button>
                    <Button size="sm" variant="outline" className="px-3">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredArrangements.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No arrangements found</p>
              <p className="text-sm text-slate-500">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        )}

        {/* Settings Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Subscription Management
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Export All Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileScreen;
