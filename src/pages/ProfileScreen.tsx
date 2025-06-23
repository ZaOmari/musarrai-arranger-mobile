import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Download, Edit, Trash2, Search, Filter, Music, Calendar, Piano } from "lucide-react";
import BottomNavigation from '@/components/BottomNavigation';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInstrument, setFilterInstrument] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [savedArrangements, setSavedArrangements] = useState([]);

  const userProfile = {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    subscription: "Premium",
    joinDate: "March 2024",
    arrangementsCount: 0
  };

  useEffect(() => {
    // Load saved arrangements from localStorage
    const arrangements = JSON.parse(localStorage.getItem('savedArrangements') || '[]');
    setSavedArrangements(arrangements);
    userProfile.arrangementsCount = arrangements.length;
  }, []);

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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40">
        <div className="mx-auto px-4 py-6 max-w-lg">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="w-10 h-10 p-0 rounded-xl bg-gray-100 hover:bg-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">My Library</h1>
              <p className="text-sm text-gray-500 font-medium">{savedArrangements.length} arrangements</p>
            </div>
            <div className="w-10" /> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 py-8 space-y-6 max-w-lg">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
              <p className="text-sm text-gray-500 font-medium">{userProfile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-gradient-to-r from-gold-100 to-yellow-100 text-gold-800 text-xs font-medium">
                  {userProfile.subscription}
                </Badge>
                <span className="text-xs text-gray-500 font-medium">Since {userProfile.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Search className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Find Arrangements</h3>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by title or composer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Instrument
              </label>
              <Select value={filterInstrument} onValueChange={setFilterInstrument}>
                <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="piano">Piano</SelectItem>
                  <SelectItem value="violin">Violin</SelectItem>
                  <SelectItem value="guitar">Guitar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Date
              </label>
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="h-12 rounded-2xl border-gray-200 bg-gray-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="week">This week</SelectItem>
                  <SelectItem value="month">This month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Arrangements List */}
        <div className="space-y-4">
          {filteredArrangements.map((arrangement) => {
            const TargetIcon = getInstrumentIcon(arrangement.targetInstrument);
            const OriginalIcon = getInstrumentIcon(arrangement.originalInstrument);
            
            return (
              <div key={arrangement.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{arrangement.thumbnail}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{arrangement.title}</h3>
                        <p className="text-sm text-gray-500 font-medium">{arrangement.composer}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-2">
                        <OriginalIcon className="w-4 h-4" />
                        <span className="font-medium">{arrangement.originalInstrument}</span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-2">
                        <TargetIcon className="w-4 h-4" />
                        <span className="font-medium">{arrangement.targetInstrument}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`text-xs font-medium ${skillLevelColors[arrangement.skillLevel]}`}>
                        {arrangement.skillLevel}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3" />
                        {new Date(arrangement.dateCreated).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Notes Preview */}
                    {arrangement.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-700 font-medium mb-1">Notes:</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{arrangement.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex-1 h-12 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 h-12 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold">
                    <Edit className="w-4 h-4 mr-2" />
                    Re-adapt
                  </Button>
                  <Button size="sm" variant="outline" className="px-4 h-12 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredArrangements.length === 0 && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-bold text-lg mb-2">No arrangements found</p>
            <p className="text-sm text-gray-500 font-medium">
              {savedArrangements.length === 0 ? "Create your first arrangement to see it here" : "Try adjusting your search or filters"}
            </p>
          </div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Preferences</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold text-gray-900">
              Account Settings
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold text-gray-900">
              Subscription Management
            </Button>
            <Button variant="outline" className="w-full justify-start h-14 rounded-2xl bg-gray-50 border-gray-200 hover:bg-white font-semibold text-gray-900">
              Export All Data
            </Button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProfileScreen;
