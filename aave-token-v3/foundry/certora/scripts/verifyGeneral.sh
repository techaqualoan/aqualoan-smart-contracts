if [[ "$1" ]]
then
    RULE="--rule $1"
fi

certoraRun certora/harness/AquaTokenV3HarnessStorage.sol:AquaTokenV3Harness \
    --verify AquaTokenV3Harness:certora/specs/general.spec \
    --packages openzeppelin-contracts=lib/openzeppelin-contracts \
    $RULE \
    --solc solc8.13 \
    --optimistic_loop \
    --send_only \
    --prover_args "-smt_bitVectorTheory true" \
    --cloud \
    --msg "AquaTokenV3:general.spec $1"

