"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Award, Search, Star, MapPin, Phone, Mail, CheckCircle2, Filter, AlertCircle, FileText } from "lucide-react";

// Status type for TypeScript
type CertificationStatus = 'active' | 'expired' | 'suspended';

interface Broker {
  id: string;
  name: string;
  city: string;
  binIin: string;
  rating: number;
  deals: number;
  specialization: string;
  certified: string;
  status: CertificationStatus;
  experience: number;
  languages: string[];
  phone: string;
  email: string;
  website?: string;
  address: string;
  licenseNumber: string;
}

export default function RegistryPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    binIin: '',
    city: 'all',
    status: 'all' as 'all' | CertificationStatus,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
  const [showComplaint, setShowComplaint] = useState(false);
  const [complaintStatus, setComplaintStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [complaintForm, setComplaintForm] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const brokers: Broker[] = [
    {
      id: '1',
      name: "Иванов Иван Иванович",
      city: "Астана",
      binIin: "123456789012",
      rating: 4.9,
      deals: 156,
      specialization: "Ипотека",
      certified: "2024",
      status: 'active',
      experience: 5,
      languages: ['Русский', 'Қазақша'],
      phone: '+7 777 123 4567',
      email: 'ivanov@example.com',
      website: 'www.ivanov-broker.kz',
      address: 'г. Астана, ул. Бейбитшилик 10, офис 45',
      licenseNumber: 'БРК-123456'
    },
    {
      id: '2',
      name: "ТОО 'Финансовый Консалтинг'",
      city: "Алматы",
      binIin: "987654321098",
      rating: 4.8,
      deals: 142,
      specialization: "Потребительские кредиты",
      certified: "2024",
      status: 'active',
      experience: 3,
      languages: ['Русский', 'Қазақша', 'English'],
      phone: '+7 707 765 4321',
      email: 'info@finance-consult.kz',
      website: 'www.finance-consult.kz',
      address: 'г. Алматы, пр. Абылай хана 67, офис 12',
      licenseNumber: 'БРК-654321'
    },
    {
      id: '3',
      name: "Сидоров Петр Александрович",
      city: "Шымкент",
      binIin: "567890123456",
      rating: 4.7,
      deals: 98,
      specialization: "Автокредиты",
      certified: "2024",
      status: 'suspended',
      experience: 2,
      languages: ['Русский', 'Қазақша'],
      phone: '+7 701 234 5678',
      email: 'sidorov.p@mail.ru',
      address: 'г. Шымкент, ул. Толе би 45, офис 3',
      licenseNumber: 'БРК-789012'
    },
    {
      id: '4',
      name: "Нурсултанов Ерлан Маратович",
      city: "Астана",
      binIin: "345678901234",
      rating: 4.5,
      deals: 187,
      specialization: "Рефинансирование",
      certified: "2023",
      status: 'expired',
      experience: 7,
      languages: ['Қазақша', 'Русский'],
      phone: '+7 777 987 6543',
      email: 'nursultanov.em@gmail.com',
      address: 'г. Астана, ул. Кенесары 12, офис 7',
      licenseNumber: 'БРК-345678'
    },
    {
      id: '5',
      name: "Каримова Айгуль Бакытовна",
      city: "Караганда",
      binIin: "901234567890",
      rating: 4.6,
      deals: 76,
      specialization: "МСБ кредиты",
      certified: "2024",
      status: 'active',
      experience: 4,
      languages: ['Русский', 'Қазақша', 'English'],
      phone: '+7 705 123 4567',
      email: 'karimova.ab@mail.ru',
      website: 'www.karimova-credit.kz',
      address: 'г. Караганда, ул. Ерубаева 34, офис 9',
      licenseNumber: 'БРК-901234'
    },
    {
      id: '6',
      name: "ТОО 'Кредит Эксперт Групп'",
      city: "Алматы",
      binIin: "678901234567",
      rating: 4.8,
      deals: 132,
      specialization: "Ипотека",
      certified: "2023",
      status: 'active',
      experience: 6,
      languages: ['Русский', 'Қазақша', 'English', '中文'],
      phone: '+7 727 123 4567',
      email: 'info@creditexpert.kz',
      website: 'www.creditexpert.kz',
      address: 'г. Алматы, ул. Гоголя 78, офис 15',
      licenseNumber: 'БРК-567890'
    },
  ];

  // Filter brokers based on search and filters
  const filteredBrokers = brokers.filter(broker => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      broker.name.toLowerCase().includes(searchLower) ||
      broker.city.toLowerCase().includes(searchLower) ||
      broker.binIin.toLowerCase().includes(searchLower);
    
    const matchesName = !filters.name || 
      broker.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchesBinIin = !filters.binIin || 
      broker.binIin.toLowerCase().includes(filters.binIin.toLowerCase());
    const matchesCity = filters.city === 'all' || !filters.city || broker.city === filters.city;
    const matchesStatus = filters.status === 'all' || broker.status === filters.status;
    
    return matchesSearch && matchesName && matchesBinIin && matchesCity && matchesStatus;
  });

  // Get unique cities for filter dropdown
  const cities = [...new Set(brokers.map(broker => broker.city))];

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setComplaintStatus({ 
        type: 'success', 
        message: t.registry.complaint.success 
      });
      // Reset form after 3 seconds
      setTimeout(() => {
        setComplaintStatus({ type: null, message: '' });
        setComplaintForm({ name: '', phone: '', message: '' });
        setShowComplaint(false);
      }, 3000);
    }, 1000);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      name: '',
      binIin: '',
      city: 'all',
      status: 'all',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pl-14 sm:px-6 md:pl-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{t.registry.title}</h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {t.registry.subtitle}
          </p>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder={`${t.registry.search}...`} 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {t.registry.filters.title}
                </Button>
                <Button variant="outline" onClick={resetFilters}>
                  <X className="mr-2 h-4 w-4" />
                  {t.registry.filters.reset}
                </Button>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="mt-2 grid grid-cols-1 gap-4 rounded-lg border bg-muted/20 p-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.registry.filters.name}</Label>
                    <Input 
                      id="name"
                      placeholder={t.registry.filters.namePlaceholder}
                      value={filters.name}
                      onChange={(e) => setFilters({...filters, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="binIin">{t.registry.filters.binIin}</Label>
                    <Input 
                      id="binIin"
                      placeholder={t.registry.filters.binIinPlaceholder}
                      value={filters.binIin}
                      onChange={(e) => setFilters({...filters, binIin: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">{t.registry.filters.city}</Label>
                    <Select 
                      value={filters.city} 
                      onValueChange={(value) => setFilters({...filters, city: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.registry.selectCity} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.registry.allCities}</SelectItem>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">{t.registry.filters.status}</Label>
                    <Select 
                      value={filters.status} 
                      onValueChange={(value) => setFilters({...filters, status: value as any})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.registry.selectStatus} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.registry.filters.statusOptions.all}</SelectItem>
                        <SelectItem value="active">{t.registry.filters.statusOptions.active}</SelectItem>
                        <SelectItem value="expired">{t.registry.filters.statusOptions.expired}</SelectItem>
                        <SelectItem value="suspended">{t.registry.filters.statusOptions.suspended}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Brokers List */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {filteredBrokers.length > 0 ? (
            filteredBrokers.map((broker) => {
              const statusConfig = {
                active: { 
                  color: 'bg-green-100 text-green-800',
                  text: t.registry.statusActive
                },
                expired: { 
                  color: 'bg-yellow-100 text-yellow-800',
                  text: t.registry.statusExpired
                },
                suspended: { 
                  color: 'bg-red-100 text-red-800',
                  text: t.registry.statusSuspended
                }
              } as const;
              
              const statusInfo = statusConfig[broker.status];

              return (
                <Card key={broker.id} className="relative overflow-hidden">
                  {/* Status Badge */}
                  <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${statusInfo.color}`}>
                    {statusInfo.text}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-base md:text-lg">{broker.name}</CardTitle>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-3 w-3" />
                              {broker.city}
                            </div>
                            <div className="flex items-center">
                              <FileText className="mr-1 h-3 w-3" />
                              {broker.binIin}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1 rounded-lg bg-yellow-50 px-2 py-1 w-fit">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 md:h-4 md:w-4" />
                      <span className="text-xs font-semibold md:text-sm">{broker.rating}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                        {broker.specialization}
                      </span>
                      <span className="text-muted-foreground">
                        {broker.deals} {t.registry.deals}
                      </span>
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4" />
                        {t.registry.certified} {broker.certified}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 whitespace-nowrap text-xs min-w-0 px-2"
                        onClick={() => {
                          setSelectedBroker(broker);
                          setShowComplaint(true);
                        }}
                      >
                        <AlertCircle className="mr-1.5 h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate">{t.registry.complaint.title}</span>
                      </Button>
                      
                      <a href={`tel:${broker.phone.replace(/\D/g, '')}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                          <Phone className="mr-2 h-4 w-4" />
                          {t.registry.call}
                        </Button>
                      </a>
                      
                      <a href={`mailto:${broker.email}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full">
                          <Mail className="mr-2 h-4 w-4" />
                          {t.registry.write}
                        </Button>
                      </a>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          setSelectedBroker(broker);
                          // Here you would typically open a modal with more details
                        }}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        {t.registry.brokerInfo.viewLicense}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t.registry.noBrokersFound}</h3>
              <p className="mt-1 text-sm text-gray-500">{t.registry.tryChangeFilters}</p>
              <Button className="mt-4" onClick={resetFilters}>
                {t.registry.resetFiltersButton}
              </Button>
            </div>
          )}
        </div>

        {/* Pagination would go here */}
        
        {/* Complaint Dialog */}
        <Dialog open={showComplaint} onOpenChange={setShowComplaint}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{t.registry.complaint.title}</DialogTitle>
              {selectedBroker && (
                <p className="text-sm text-muted-foreground">
                  {t.registry.complaint.complaintOn} <span className="font-medium">{selectedBroker.name}</span>
                </p>
              )}
            </DialogHeader>
            
            {complaintStatus.type ? (
              <div className={`flex flex-col items-center justify-center py-8 text-center ${complaintStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {complaintStatus.type === 'success' ? (
                  <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                ) : (
                  <XCircle className="mb-4 h-12 w-12 text-red-500" />
                )}
                <p className="text-lg font-medium">{complaintStatus.message}</p>
              </div>
            ) : (
              <form onSubmit={handleComplaintSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.registry.complaint.name}</Label>
                  <Input 
                    id="name" 
                    placeholder={t.registry.complaint.namePlaceholder} 
                    required 
                    value={complaintForm.name}
                    onChange={(e) => setComplaintForm({...complaintForm, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.registry.complaint.phone}</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+7 (___) ___-__-__" 
                    required
                    value={complaintForm.phone}
                    onChange={(e) => setComplaintForm({...complaintForm, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">{t.registry.complaint.message}</Label>
                  <Textarea 
                    id="message" 
                    placeholder={t.registry.complaint.messagePlaceholder} 
                    className="min-h-[120px]" 
                    required
                    value={complaintForm.message}
                    onChange={(e) => setComplaintForm({...complaintForm, message: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowComplaint(false)}
                  >
                    {t.registry.complaint.cancel}
                  </Button>
                  <Button type="submit">
                    {t.registry.complaint.submit}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
