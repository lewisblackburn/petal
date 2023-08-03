-- DropIndex
DROP INDEX "CreditMember_id_order_key";

-- CreateIndex
CREATE INDEX "CreditMember_order_idx" ON "CreditMember"("order");
