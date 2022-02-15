crm = discovery.build(
    'cloudresourcemanager', 'v3', http=creds.authorize(httplib2.Http()))
policy = crm.organizations().getIamPolicy(
    resource=flags.organizationId, body={}).execute()

admin_binding = next(
    (binding
        for binding in policy['bindings']
        if binding['role'] == 'roles/resourcemanager.organizationAdmin'),
    None)

# Add an empty Organization Admin binding if not present.
if not admin_binding:
    admin_binding = {
        'role': 'roles/resourcemanager.organizationAdmin',
        'members': []
    }
policy['bindings'].append(admin_binding)

# Add the new Admin (if necessary).
new_admin = 'user:' + flags.adminEmail
if new_admin not in admin_binding['members']:
    admin_binding['members'].append(new_admin)
policy = crm.organizations().setIamPolicy(
    resource=flags.organizationId,
    body={
        'resource': flags.organizationId,
        'policy': policy
    }).execute()

print json.dumps(policy, indent=2)
