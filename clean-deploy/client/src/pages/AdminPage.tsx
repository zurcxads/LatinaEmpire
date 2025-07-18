import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export default function AdminPage() {
  const [eventData, setEventData] = useState({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    ticketPrice: '',
    ticketLink: '',
    locationAddress: '',
    hostName: '',
    hostTitle: '',
    isPast: false
  });

  const [ambassadorData, setAmbassadorData] = useState({
    name: '',
    slug: '',
    title: '',
    location: '',
    country: '',
    quote: '',
    shortBio: '',
    fullBio: '',
    yearsInProgram: 0,
    eventsHosted: 0,
    membersSince: '',
    languages: '',
    expertise: ''
  });

  const [blogData, setBlogData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    authorTitle: '',
    date: '',
    readTime: '',
    category: 'leadership',
    tags: '',
    featured: false
  });

  const [activeTab, setActiveTab] = useState('events');

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventPayload = {
      ...eventData,
      slug: eventData.slug || generateSlug(eventData.title),
      languages: eventData.languages ? eventData.languages.split(',').map(l => l.trim()) : [],
      expertise: eventData.expertise ? eventData.expertise.split(',').map(e => e.trim()) : []
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Event created successfully',
        });
        setEventData({
          title: '',
          slug: '',
          description: '',
          shortDescription: '',
          location: '',
          date: '',
          startTime: '',
          endTime: '',
          ticketPrice: '',
          ticketLink: '',
          locationAddress: '',
          hostName: '',
          hostTitle: '',
          isPast: false
        });
      } else {
        throw new Error('Failed to create event');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create event. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAmbassadorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const ambassadorPayload = {
      ...ambassadorData,
      slug: ambassadorData.slug || generateSlug(ambassadorData.name),
      languages: ambassadorData.languages ? ambassadorData.languages.split(',').map(l => l.trim()) : [],
      expertise: ambassadorData.expertise ? ambassadorData.expertise.split(',').map(e => e.trim()) : []
    };

    try {
      const response = await fetch('/api/ambassadors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ambassadorPayload),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Ambassador created successfully',
        });
        setAmbassadorData({
          name: '',
          slug: '',
          title: '',
          location: '',
          country: '',
          quote: '',
          shortBio: '',
          fullBio: '',
          yearsInProgram: 0,
          eventsHosted: 0,
          membersSince: '',
          languages: '',
          expertise: ''
        });
      } else {
        throw new Error('Failed to create ambassador');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create ambassador. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogPayload = {
      ...blogData,
      slug: blogData.slug || generateSlug(blogData.title),
      tags: blogData.tags ? blogData.tags.split(',').map(t => t.trim()) : []
    };

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogPayload),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Blog post created successfully',
        });
        setBlogData({
          title: '',
          slug: '',
          excerpt: '',
          content: '',
          author: '',
          authorTitle: '',
          date: '',
          readTime: '',
          category: 'leadership',
          tags: '',
          featured: false
        });
      } else {
        throw new Error('Failed to create blog post');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create blog post. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-[#d81b60]">Latina Empire Admin</h1>
      
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={() => setActiveTab('events')}
          variant={activeTab === 'events' ? 'default' : 'outline'}
        >
          Events
        </Button>
        <Button 
          onClick={() => setActiveTab('ambassadors')}
          variant={activeTab === 'ambassadors' ? 'default' : 'outline'}
        >
          Ambassadors
        </Button>
        <Button 
          onClick={() => setActiveTab('blog')}
          variant={activeTab === 'blog' ? 'default' : 'outline'}
        >
          Blog Posts
        </Button>
      </div>

      {activeTab === 'events' && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={eventData.title}
                    onChange={(e) => setEventData({...eventData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={eventData.slug}
                    onChange={(e) => setEventData({...eventData, slug: e.target.value})}
                    placeholder="auto-generated from title"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={eventData.description}
                  onChange={(e) => setEventData({...eventData, description: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  value={eventData.shortDescription}
                  onChange={(e) => setEventData({...eventData, shortDescription: e.target.value})}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={eventData.location}
                    onChange={(e) => setEventData({...eventData, location: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({...eventData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    value={eventData.startTime}
                    onChange={(e) => setEventData({...eventData, startTime: e.target.value})}
                    placeholder="9:00 AM"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    value={eventData.endTime}
                    onChange={(e) => setEventData({...eventData, endTime: e.target.value})}
                    placeholder="5:00 PM"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ticketPrice">Ticket Price</Label>
                  <Input
                    id="ticketPrice"
                    value={eventData.ticketPrice}
                    onChange={(e) => setEventData({...eventData, ticketPrice: e.target.value})}
                    placeholder="$297"
                  />
                </div>
                <div>
                  <Label htmlFor="ticketLink">Ticket Link</Label>
                  <Input
                    id="ticketLink"
                    value={eventData.ticketLink}
                    onChange={(e) => setEventData({...eventData, ticketLink: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="locationAddress">Location Address</Label>
                <Input
                  id="locationAddress"
                  value={eventData.locationAddress}
                  onChange={(e) => setEventData({...eventData, locationAddress: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hostName">Host Name</Label>
                  <Input
                    id="hostName"
                    value={eventData.hostName}
                    onChange={(e) => setEventData({...eventData, hostName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="hostTitle">Host Title</Label>
                  <Input
                    id="hostTitle"
                    value={eventData.hostTitle}
                    onChange={(e) => setEventData({...eventData, hostTitle: e.target.value})}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">Create Event</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'ambassadors' && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Ambassador</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAmbassadorSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={ambassadorData.name}
                    onChange={(e) => setAmbassadorData({...ambassadorData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ambassadorSlug">Slug</Label>
                  <Input
                    id="ambassadorSlug"
                    value={ambassadorData.slug}
                    onChange={(e) => setAmbassadorData({...ambassadorData, slug: e.target.value})}
                    placeholder="auto-generated from name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ambassadorTitle">Title</Label>
                  <Input
                    id="ambassadorTitle"
                    value={ambassadorData.title}
                    onChange={(e) => setAmbassadorData({...ambassadorData, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="ambassadorLocation">Location</Label>
                  <Input
                    id="ambassadorLocation"
                    value={ambassadorData.location}
                    onChange={(e) => setAmbassadorData({...ambassadorData, location: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={ambassadorData.country}
                  onChange={(e) => setAmbassadorData({...ambassadorData, country: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="quote">Quote</Label>
                <Textarea
                  id="quote"
                  value={ambassadorData.quote}
                  onChange={(e) => setAmbassadorData({...ambassadorData, quote: e.target.value})}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="shortBio">Short Bio</Label>
                <Textarea
                  id="shortBio"
                  value={ambassadorData.shortBio}
                  onChange={(e) => setAmbassadorData({...ambassadorData, shortBio: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="fullBio">Full Bio</Label>
                <Textarea
                  id="fullBio"
                  value={ambassadorData.fullBio}
                  onChange={(e) => setAmbassadorData({...ambassadorData, fullBio: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="yearsInProgram">Years in Program</Label>
                  <Input
                    id="yearsInProgram"
                    type="number"
                    value={ambassadorData.yearsInProgram}
                    onChange={(e) => setAmbassadorData({...ambassadorData, yearsInProgram: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="eventsHosted">Events Hosted</Label>
                  <Input
                    id="eventsHosted"
                    type="number"
                    value={ambassadorData.eventsHosted}
                    onChange={(e) => setAmbassadorData({...ambassadorData, eventsHosted: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="membersSince">Member Since</Label>
                  <Input
                    id="membersSince"
                    value={ambassadorData.membersSince}
                    onChange={(e) => setAmbassadorData({...ambassadorData, membersSince: e.target.value})}
                    placeholder="2021"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="languages">Languages (comma-separated)</Label>
                  <Input
                    id="languages"
                    value={ambassadorData.languages}
                    onChange={(e) => setAmbassadorData({...ambassadorData, languages: e.target.value})}
                    placeholder="English, Spanish"
                  />
                </div>
                <div>
                  <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                  <Input
                    id="expertise"
                    value={ambassadorData.expertise}
                    onChange={(e) => setAmbassadorData({...ambassadorData, expertise: e.target.value})}
                    placeholder="Leadership, Marketing, Strategy"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">Create Ambassador</Button>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === 'blog' && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBlogSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blogTitle">Title</Label>
                  <Input
                    id="blogTitle"
                    value={blogData.title}
                    onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="blogSlug">Slug</Label>
                  <Input
                    id="blogSlug"
                    value={blogData.slug}
                    onChange={(e) => setBlogData({...blogData, slug: e.target.value})}
                    placeholder="auto-generated from title"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={blogData.excerpt}
                  onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})}
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={blogData.content}
                  onChange={(e) => setBlogData({...blogData, content: e.target.value})}
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={blogData.author}
                    onChange={(e) => setBlogData({...blogData, author: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="authorTitle">Author Title</Label>
                  <Input
                    id="authorTitle"
                    value={blogData.authorTitle}
                    onChange={(e) => setBlogData({...blogData, authorTitle: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="blogDate">Date</Label>
                  <Input
                    id="blogDate"
                    type="date"
                    value={blogData.date}
                    onChange={(e) => setBlogData({...blogData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    value={blogData.readTime}
                    onChange={(e) => setBlogData({...blogData, readTime: e.target.value})}
                    placeholder="8 min read"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={blogData.category}
                    onChange={(e) => setBlogData({...blogData, category: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="leadership">Leadership</option>
                    <option value="career">Career</option>
                    <option value="entrepreneurship">Entrepreneurship</option>
                    <option value="health">Health</option>
                    <option value="relationships">Relationships</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={blogData.tags}
                    onChange={(e) => setBlogData({...blogData, tags: e.target.value})}
                    placeholder="leadership, career, professional development"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={blogData.featured}
                  onChange={(e) => setBlogData({...blogData, featured: e.target.checked})}
                />
                <Label htmlFor="featured">Featured Post</Label>
              </div>

              <Button type="submit" className="w-full">Create Blog Post</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}