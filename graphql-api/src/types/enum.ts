import { registerEnumType } from "type-graphql";

// Role User
export enum Role {
    Admin = "Admin",
    Guest = "Guest",
}

registerEnumType(Role, {
    name: "Role",
    description: "Role Admin or Guest"
})

// Status
export enum Status {
    Active = "Active",
    Inactive = "Inactive",
}

registerEnumType(Status, {
    name: "Status", // this one is mandatory
    description: "Active or Inactive", // this one is optional
})