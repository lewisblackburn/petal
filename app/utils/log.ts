import { prisma } from './db.server.ts'

export default async function log(
  userId: string,
  entityId: string,
  entityName: string,
  entity: any,
  updatedEntity: any,
  action: string,
) {
  const changes = []
  for (const key in entity) {
    if (key === 'updatedAt') continue
    let oldValue: any = entity ? entity[key] : ''
    let newValue: any = updatedEntity[key]

    if (oldValue instanceof Object) {
      try {
        oldValue = new Date(oldValue).toISOString()
      } catch { }
    }
    if (newValue instanceof Object) {
      try {
        newValue = new Date(newValue).toISOString()
      } catch { }
    }

    if (oldValue !== newValue) {
      changes.push({
        attribute: key,
        oldValue,
        newValue,
      })
    }
  }

  await prisma.auditLog.create({
    data: {
      action,
      entity: entityName,
      entityId,
      userId,
      changes: JSON.stringify(changes),
    },
  })
}
