// import { Building2, Globe, Mail, MapPin, Phone, Upload } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

// const CreateProfile = () => {
//   return (
//     <div className="space-y-6">
//       {/* Header */}

//       <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <h2 className="text-xl font-bold">Company Profile</h2>

//           <p className="text-sm text-muted-foreground">
//             Complete and manage your company information.
//           </p>
//         </div>
//       </div>

//       <form action="" className="space-y-6">
//         {/* Logo + Basic */}
//         <div className="grid gap-6 lg:grid-cols-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Company Logo</CardTitle>
//               <CardDescription>Upload your company logo.</CardDescription>
//             </CardHeader>

//             <CardContent>
//               <div className="flex flex-col items-center gap-4">
//                 <div className="flex h-32 w-32 items-center justify-center rounded-2xl border bg-muted">
//                   <Building2 className="h-12 w-12 text-muted-foreground" />
//                 </div>

//                 <Button variant="outline">
//                   <Upload className="mr-2 h-4 w-4" />
//                   Upload Logo
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="lg:col-span-2">
//             <CardHeader>
//               <CardTitle>Company Information</CardTitle>
//               <CardDescription>
//                 Basic information about your company.
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <FieldGroup className="grid gap-4 md:grid-cols-2">
//                 <Field>
//                   <FieldLabel>Company Name</FieldLabel>
//                   <Input defaultValue="Exact Manpower Ltd" />
//                 </Field>
//                 <Field>
//                   <FieldLabel>Industry</FieldLabel>
//                   <Input placeholder="Technology" />
//                 </Field>
//                 <Field>
//                   <FieldLabel>Company Size</FieldLabel>
//                   <Input placeholder="50-100 Employees" />
//                 </Field>
//                 <Field>
//                   <FieldLabel>Founded Year</FieldLabel>
//                   <Input placeholder="2022" />
//                 </Field>
//               </FieldGroup>
//             </CardContent>
//           </Card>
//         </div>

//         {/* About Company */}
//         <Card>
//           <CardHeader>
//             <CardTitle>About Company</CardTitle>
//             <CardDescription>
//               Tell job seekers about your company.
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <Textarea
//               rows={8}
//               placeholder="Describe your company, mission, vision, culture and values..."
//             />
//           </CardContent>
//         </Card>

//         {/* Contact Details */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Contact Information</CardTitle>
//           </CardHeader>

//           <CardContent className="grid gap-4 md:grid-cols-2">
//             <div>
//               <Label>Email</Label>

//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input className="pl-9" />
//               </div>
//             </div>

//             <div>
//               <Label>Phone</Label>

//               <div className="relative">
//                 <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input className="pl-9" />
//               </div>
//             </div>

//             <div>
//               <Label>Website</Label>

//               <div className="relative">
//                 <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input className="pl-9" />
//               </div>
//             </div>

//             <div>
//               <Label>LinkedIn</Label>

//               <Input placeholder="https://linkedin.com/company/..." />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Address */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Location</CardTitle>
//           </CardHeader>

//           <CardContent className="grid gap-4 md:grid-cols-2">
//             <div>
//               <Label>Country</Label>
//               <Input defaultValue="Tanzania" />
//             </div>

//             <div>
//               <Label>Region</Label>
//               <Input defaultValue="Dar es Salaam" />
//             </div>

//             <div>
//               <Label>City</Label>
//               <Input />
//             </div>

//             <div>
//               <Label>Street Address</Label>
//               <Input />
//             </div>

//             <div className="md:col-span-2">
//               <Label>Google Maps Location</Label>

//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input className="pl-9" placeholder="Paste Google Maps URL" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Recruitment Contact */}
//         {/* <Card>
//           <CardHeader>
//             <CardTitle>Recruitment Contact</CardTitle>

//             <CardDescription>
//               Person responsible for recruitment.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="grid gap-4 md:grid-cols-2">
//             <div>
//               <Label>Contact Person Name</Label>
//               <Input />
//             </div>

//             <div>
//               <Label>Position</Label>
//               <Input />
//             </div>

//             <div>
//               <Label>Email</Label>
//               <Input />
//             </div>

//             <div>
//               <Label>Phone</Label>
//               <Input />
//             </div>
//           </CardContent>
//         </Card> */}

//         {/* Business Verification */}

//         <Card>
//           <CardHeader>
//             <CardTitle>Business Verification</CardTitle>

//             <CardDescription>
//               Upload company verification documents.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="grid gap-4 md:grid-cols-3">
//             <div>
//               <Label>BRELA Certificate</Label>
//               <Input type="file" />
//             </div>

//             <div>
//               <Label>TIN Certificate</Label>
//               <Input type="file" />
//             </div>

//             <div>
//               <Label>Company Profile PDF</Label>
//               <Input type="file" />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Bottom Save */}

//         <div className="flex justify-end">
//           <Button size="lg">Save Company Profile</Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateProfile;

// FOOOORMS
// <Card>
//   <CardContent className="space-y-4">

//     {/* Keywords */}
//     {/* <div className="flex justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2">
//               <ShieldCheck className="size-5 text-primary" />
//               <h2 className="text-lg font-semibold">Meta Keywords (SEO)</h2>
//             </div>

//             <p className="leading-7 text-muted-foreground">
//               Add meta keywords for the job
//             </p>
//           </div>

//           <Dialog>
//             <form>
//               <DialogTrigger asChild>
//                 <Button size="sm" variant="outline">
//                   <PencilLine className="mr-2 size-4" />
//                   Fill
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="-mx-4 max-h-[80vh] overflow-y-auto px-4 sm:max-w-2xl">
//                 <DialogHeader>
//                   <DialogTitle>Meta Keywords</DialogTitle>
//                 </DialogHeader>
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="name-1">Related Keywords</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Theme" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Light</SelectItem>
//                           <SelectItem value="dark">Dark</SelectItem>
//                           <SelectItem value="system">System</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                 </FieldGroup>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </form>
//           </Dialog>
//         </div> */}

//     {/* <Separator /> */}

//     {/* Job Location */}
//     {/* <div className="flex justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2">
//               <MapPin className="size-5 text-primary" />

//               <h2 className="text-lg font-semibold">Job Location</h2>
//             </div>

//             <p className="leading-7 text-muted-foreground">
//               Add job location
//             </p>
//           </div>

//           <Dialog>
//             <form>
//               <DialogTrigger asChild>
//                 <Button size="sm" variant="outline">
//                   <PencilLine className="mr-2 size-4" />
//                   Fill
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="-mx-4 max-h-[80vh] overflow-y-auto px-4 sm:max-w-2xl">
//                 <DialogHeader>
//                   <DialogTitle>Location Details</DialogTitle>
//                 </DialogHeader>
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="name-1">Country</Label>
//                     <Input />
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Region</Label>
//                     <Input />
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Sub Location</Label>
//                     <Input />
//                   </Field>
//                 </FieldGroup>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </form>
//           </Dialog>
//         </div>

//         <Separator /> */}

//     {/* Reporting Structure */}
//     {/* <div className="flex justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2">
//               <Users className="size-5 text-primary" />

//               <h2 className="text-lg font-semibold">Reporting Structure</h2>
//             </div>

//             <p className="leading-7 text-muted-foreground">
//               Add reporting structure for the job
//             </p>
//           </div>

//           <Dialog>
//             <form>
//               <DialogTrigger asChild>
//                 <Button size="sm" variant="outline">
//                   <PencilLine className="mr-2 size-4" />
//                   Fill
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="-mx-4 max-h-[80vh] overflow-y-auto px-4 sm:max-w-2xl">
//                 <DialogHeader>
//                   <DialogTitle>Reporting Structure</DialogTitle>
//                 </DialogHeader>
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="name-1">Report to</Label>
//                     <Input />
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Supervision</Label>
//                     <Input />
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Interact</Label>
//                     <Input />
//                   </Field>
//                 </FieldGroup>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </form>
//           </Dialog>
//         </div>

//         <Separator /> */}

//     {/* Education */}
//     {/* <div className="flex justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2">
//               <GraduationCap className="size-5 text-primary" />
//               <h2 className="text-lg font-semibold">Job Education</h2>
//             </div>

//             <p className="leading-7 text-muted-foreground">
//               Add required education qualifications for the job
//             </p>
//           </div>

//           <Dialog>
//             <form>
//               <DialogTrigger asChild>
//                 <Button size="sm" variant="outline">
//                   <PencilLine className="mr-2 size-4" />
//                   Fill
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="-mx-4 max-h-[80vh] overflow-y-auto px-4 sm:max-w-2xl">
//                 <DialogHeader>
//                   <DialogTitle>Education</DialogTitle>
//                 </DialogHeader>
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="name-1">Education Level</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Education level" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Masters</SelectItem>
//                           <SelectItem value="dark">Degree</SelectItem>
//                           <SelectItem value="system">Diploma</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Programme Name</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Programme name" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Engineering</SelectItem>
//                           <SelectItem value="dark">
//                             Human Resource
//                           </SelectItem>
//                           <SelectItem value="system">
//                             Doctor of Medicine
//                           </SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Major / Specialized</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Maojors" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Major 1</SelectItem>
//                           <SelectItem value="dark">Major 2</SelectItem>
//                           <SelectItem value="system">Major 3</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                 </FieldGroup>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </form>
//           </Dialog>
//         </div>

//         <Separator /> */}

//     {/* Languages */}
//     {/* <div className="flex justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2">
//               <Languages className="size-5 text-primary" />
//               <h2 className="text-lg font-semibold">Languages</h2>
//             </div>

//             <p className="leading-7 text-muted-foreground">
//               Add languages required for the job
//             </p>
//           </div>

//           <Dialog>
//             <form>
//               <DialogTrigger asChild>
//                 <Button size="sm" variant="outline">
//                   <PencilLine className="mr-2 size-4" />
//                   Fill
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="-mx-4 max-h-[80vh] overflow-y-auto px-4 sm:max-w-2xl">
//                 <DialogHeader>
//                   <DialogTitle>Language</DialogTitle>
//                 </DialogHeader>
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="name-1">Name</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Abilities" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Swahili</SelectItem>
//                           <SelectItem value="dark">English</SelectItem>
//                           <SelectItem value="system">Spanish</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Writting</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Abilities" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Good</SelectItem>
//                           <SelectItem value="dark">Excellent</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Reading</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Abilities" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Good</SelectItem>
//                           <SelectItem value="dark">Excellent</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                 </FieldGroup>
//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </form>
//           </Dialog>
//         </div>

//         <Separator /> */}

//     {/* Requirements */}
//     {/* <div className="flex justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2">
//               <BriefcaseBusiness className="size-5 text-primary" />
//               <h2 className="text-lg font-semibold">Job Requirements</h2>
//             </div>

//             <p className="leading-7 text-muted-foreground">
//               Add job requirements
//             </p>
//           </div>

//           <Dialog>
//             <form>
//               <DialogTrigger asChild>
//                 <Button size="sm" variant="outline">
//                   <PencilLine className="mr-2 size-4" />
//                   Fill
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="-mx-4 max-h-[80vh] overflow-y-auto px-4 sm:max-w-2xl">
//                 <DialogHeader>
//                   <DialogTitle>Job Requirements</DialogTitle>
//                 </DialogHeader>
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="name-1">Gender</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Gender" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Male</SelectItem>
//                           <SelectItem value="dark">Female</SelectItem>
//                           <SelectItem value="system">Both</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Culture</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Cultures" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Good</SelectItem>
//                           <SelectItem value="dark">Excellent</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Personalities</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Personalities" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Good</SelectItem>
//                           <SelectItem value="dark">Excellent</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Skills</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Skills" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Good</SelectItem>
//                           <SelectItem value="dark">Excellent</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Software</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Softwares" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Good</SelectItem>
//                           <SelectItem value="dark">Excellent</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Tools</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Tools" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Good</SelectItem>
//                           <SelectItem value="dark">Excellent</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Proficiencies</Label>
//                     <Select>
//                       <SelectTrigger className="w-[180px]">
//                         <SelectValue placeholder="Proficiencies" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectItem value="light">Good</SelectItem>
//                           <SelectItem value="dark">Excellent</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                   </Field>
//                 </FieldGroup>

//                 <FieldGroup className="grid grid-cols-2">
//                   <Field>
//                     <Label htmlFor="name-1">Minimum Age</Label>
//                     <Input />
//                   </Field>
//                   <Field>
//                     <Label htmlFor="name-1">Maximum Age</Label>
//                     <Input />
//                   </Field>
//                 </FieldGroup>

//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </form>
//           </Dialog>
//         </div>

//         <Separator /> */}

//     {/* Main Duties */}
//     {/* <div className="flex justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2">
//               <BriefcaseBusiness className="size-5 text-primary" />
//               <h2 className="text-lg font-semibold">Main Duties</h2>
//             </div>

//             <p className="leading-7 text-muted-foreground">
//               Add duties to be performed on the job
//             </p>
//           </div>

//           <Dialog>
//             <form>
//               <DialogTrigger asChild>
//                 <Button size="sm" variant="outline">
//                   <PencilLine className="mr-2 size-4" />
//                   Fill
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="-mx-4 max-h-[80vh] overflow-y-auto px-4 sm:max-w-2xl">
//                 <DialogHeader>
//                   <DialogTitle>Main Duties</DialogTitle>
//                 </DialogHeader>
//                 <FieldGroup>
//                   <Field>
//                     <Label htmlFor="name-1">Duties</Label>
//                     <Textarea placeholder="Type your message here." />
//                   </Field>
//                 </FieldGroup>

//                 <DialogFooter>
//                   <DialogClose asChild>
//                     <Button variant="outline">Cancel</Button>
//                   </DialogClose>
//                   <Button type="submit">Save changes</Button>
//                 </DialogFooter>
//               </DialogContent>
//             </form>
//           </Dialog>
//         </div> */}
//   </CardContent>
// </Card>
