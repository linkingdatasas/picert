/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

 /**
 * issue a abstract certificate on the blockchain
 * @param  {org.picert.issue} transaction - the transaction parameters
 * @transaction
 */
async function issue(transaction) {
    const abstractCertRegistry = await getAssetRegistry('org.picert.abscert');
    const factory = getFactory();
    const serializer = getSerializer();
  
    const absInfo = transaction.absInfo;
    let absCert = [];
  
    const certificate = factory.newResource('org.picert', 'abscert', absInfo.absId);
    certificate.certId = transaction.certId;
    certificate.uri = absInfo.uri;
    certificate.blockchain = 'FAB';
    /* Aqui hay que pasar todo el JSON de cert */
    certificate.certHash = sha256(JSON.stringify(serializer.toJSON(certificate, {
        validate: false, 
        convertResourcesToRelationships: true,
        permitResourcesForRelationships: false,
        deduplicateResources: false
      })));
    absCert.push(certificate);
    const result = await abstractCertRegistry.addAll(absCert);
  }
  
